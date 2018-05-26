const SERVER_URL: string = 'https://next-episode.net';
const API_URL: string = `${SERVER_URL}/api/android/v4`

export const TV_MAZE_URL: string = 'http://api.tvmaze.com/'

export const URLS = {
    SERVER_URL: 'https://next-episodes.herokuapp.com/methods',
    API_URL,
    TOP_SERIES: `${SERVER_URL}/`,
    LOGIN: `${API_URL}/services.php`
}

export const AVAILABLE_OVERLAY_CLASSES = [
    'first',
    'second',
    'third',
    'fourth',
    'fifth',
    'sixth',
    'seventh',
    'eighth',
];

export const UPDATE_COUNTDOWN_TIME = 1000;

export const ADMOB_IDS = {
    ios: 'ca-app-pub-1064727486518319/7624280366',
    android: 'ca-app-pub-1064727486518319/4188857413'
}

export const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;