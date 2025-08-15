/**
 * NOTE: You should re-export any manually added icons
 *       using consts to help TypeScript resolve the proper type
 *
 * NOTE: If an icon is part of the lucide icon set, it should be placed in the "icons" folder
 *       and automatically generated through the "pnpm run fix" command.
 */

import './omorphia.scss'

// Branding
import _FourOhFourNotFound from './branding/404.svg?component'
import _ExcitedRinthbot from './branding/rinthbot/excited.webp'
import _AppleIcon from './external/apple.svg?component'
import _BlueskyIcon from './external/bluesky.svg?component'
import _BuyMeACoffeeIcon from './external/bmac.svg?component'
import _CurseForgeIcon from './external/curseforge.svg?component'
import _DiscordIcon from './external/discord.svg?component'
import _GithubIcon from './external/github.svg?component'
import _KoFiIcon from './external/kofi.svg?component'
import _MastodonIcon from './external/mastodon.svg?component'
import _OpenCollectiveIcon from './external/opencollective.svg?component'
import _PatreonIcon from './external/patreon.svg?component'
import _PayPalIcon from './external/paypal.svg?component'
import _RedditIcon from './external/reddit.svg?component'
// External Icons
import _SSODiscordIcon from './external/sso/discord.svg?component'
import _SSOGitHubIcon from './external/sso/github.svg?component'
import _SSOGitLabIcon from './external/sso/gitlab.svg?component'
import _SSOGoogleIcon from './external/sso/google.svg?component'
import _SSOMicrosoftIcon from './external/sso/microsoft.svg?component'
import _SSOSteamIcon from './external/sso/steam.svg?component'
import _TumblrIcon from './external/tumblr.svg?component'
import _TwitterIcon from './external/twitter.svg?component'
import _WindowsIcon from './external/windows.svg?component'
import _YouTubeIcon from './external/youtube.svg?component'

// Icons

// Editor Icons

import './omorphia.scss'

export const ExcitedRinthbot = _ExcitedRinthbot
export const FourOhFourNotFound = _FourOhFourNotFound
export const SSODiscordIcon = _SSODiscordIcon
export const SSOGitHubIcon = _SSOGitHubIcon
export const SSOGitLabIcon = _SSOGitLabIcon
export const SSOGoogleIcon = _SSOGoogleIcon
export const SSOMicrosoftIcon = _SSOMicrosoftIcon
export const SSOSteamIcon = _SSOSteamIcon
export const AppleIcon = _AppleIcon
export const BlueskyIcon = _BlueskyIcon
export const BuyMeACoffeeIcon = _BuyMeACoffeeIcon
export const GithubIcon = _GithubIcon
export const CurseForgeIcon = _CurseForgeIcon
export const DiscordIcon = _DiscordIcon
export const KoFiIcon = _KoFiIcon
export const MastodonIcon = _MastodonIcon
export const OpenCollectiveIcon = _OpenCollectiveIcon
export const PatreonIcon = _PatreonIcon
export const PayPalIcon = _PayPalIcon
export const RedditIcon = _RedditIcon
export const TumblrIcon = _TumblrIcon
export const TwitterIcon = _TwitterIcon
export const WindowsIcon = _WindowsIcon
export const YouTubeIcon = _YouTubeIcon

// Skin Models
export * from './generated-icons'
export { default as ClassicPlayerModel } from './models/classic-player.gltf?url'
export { default as SlimPlayerModel } from './models/slim-player.gltf?url'

