export const API_HOST = 'http://localhost:8000'
export const STEAM_LOGIN_URL = `${API_HOST}/v1/auth/steam/login?redirect_url=${window.location.protocol}//${window.location.hostname}:${window.location.port}/auth/callback/steam`
export const OPENXBL_LOGIN_URL = `${API_HOST}/v1/auth/openxbl/login`
