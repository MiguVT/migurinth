//! Authentication flow interface

use crate::State;
use crate::state::{Credentials, MinecraftLoginFlow, MinecraftProfile};

#[tracing::instrument]
pub async fn begin_login() -> crate::Result<MinecraftLoginFlow> {
    let state = State::get().await?;

    crate::state::login_begin(&state.pool).await
}

#[tracing::instrument]
pub async fn finish_login(
    code: &str,
    flow: MinecraftLoginFlow,
) -> crate::Result<Credentials> {
    let state = State::get().await?;

    crate::state::login_finish(code, flow, &state.pool).await
}

#[tracing::instrument]
pub async fn get_default_user() -> crate::Result<Option<uuid::Uuid>> {
    let state = State::get().await?;
    let user = Credentials::get_active(&state.pool).await?;
    Ok(user.map(|user| user.offline_profile.id))
}

#[tracing::instrument]
pub async fn set_default_user(user: uuid::Uuid) -> crate::Result<()> {
    let state = State::get().await?;
    let users = Credentials::get_all(&state.pool).await?;
    let (_, mut user) = users.remove(&user).ok_or_else(|| {
        crate::ErrorKind::OtherError(format!(
            "Tried to get nonexistent user with ID {user}"
        ))
        .as_error()
    })?;

    user.active = true;
    user.upsert(&state.pool).await?;

    Ok(())
}

/// Remove a user account from the database
#[tracing::instrument]
pub async fn remove_user(uuid: uuid::Uuid) -> crate::Result<()> {
    let state = State::get().await?;

    let users = Credentials::get_all(&state.pool).await?;

    if let Some((uuid, user)) = users.remove(&uuid) {
        Credentials::remove(uuid, &state.pool).await?;

        if user.active {
            if let Some((_, mut user)) = users.into_iter().next() {
                user.active = true;
                user.upsert(&state.pool).await?;
            }
        }
    }

    Ok(())
}

/// Get a copy of the list of all user credentials
#[tracing::instrument]
pub async fn users() -> crate::Result<Vec<Credentials>> {
    let state = State::get().await?;
    let users = Credentials::get_all(&state.pool).await?;
    Ok(users.into_iter().map(|x| x.1).collect())
}

/// Create offline credentials for a given username
#[tracing::instrument]
pub async fn create_offline_credentials(username: String) -> crate::Result<Credentials> {
    let state = State::get().await?;

    // Generate a random UUID for the offline user
    let user_id = uuid::Uuid::new_v4();

    // Create offline credentials
    let credentials = Credentials {
        offline_profile: MinecraftProfile {
            id: user_id,
            name: username,
            ..MinecraftProfile::default()
        },
        access_token: format!("offline_token_{}", user_id),
        refresh_token: format!("offline_refresh_{}", user_id),
        expires: chrono::Utc::now() + chrono::Duration::days(36500), // Never expires for offline accounts (100 years)
        active: true,
    };

    credentials.upsert(&state.pool).await?;

    Ok(credentials)
}
