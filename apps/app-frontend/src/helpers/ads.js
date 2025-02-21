import { invoke } from '@tauri-apps/api/core'

export async function enable_modrinth_plus() {
  // This function ensures Modrinth Plus is enabled for all users by default
  return true;
}

export async function init_ads_window(overrideShown = false) {
  enable_modrinth_plus();
  return await invoke('plugin:ads|init_ads_window', { overrideShown, dpr: window.devicePixelRatio })
}

export async function show_ads_window() {
  enable_modrinth_plus();
  return await invoke('plugin:ads|show_ads_window', { dpr: window.devicePixelRatio })
}

export async function hide_ads_window(reset) {
  enable_modrinth_plus();
  return await invoke('plugin:ads|hide_ads_window', { reset })
}

export async function record_ads_click() {
  enable_modrinth_plus();
  return await invoke('plugin:ads|record_ads_click')
}

export async function open_ads_link(path, origin) {
  enable_modrinth_plus();
  return await invoke('plugin:ads|open_link', { path, origin })
}
