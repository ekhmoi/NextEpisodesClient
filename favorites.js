import {API_DETAILS, API_TOKEN, API_URL} from '../constants/Config'
export function addFavorite(show) {
    return function (dispatch, getState) {

        return fetch(`${API_DETAILS.URL}/add-favorite`, {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            redirect: 'follow',
            referrer: 'no-referrer',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: API_DETAILS.TOKEN,
                showId: show.id
            })
        })
            .then((res) => {
                res.json().then((json) => {
                    if (json.statusCode === 200 && json.data.favorites) {
                        dispatch({type: 'FAVORITES_LOADED', payload: json.data.favorites})
                    }
                });
            })
            .catch(err => {

                console.log('there was an error', err);
            });
    }
}


export function removeFavorite(show) {
    return function (dispatch, getState) {

        return fetch(`${API_DETAILS.URL}/remove-favorite`, {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            redirect: 'follow',
            referrer: 'no-referrer',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: API_DETAILS.TOKEN,
                showId: show.id
            })
        })
            .then((res) => {
                res.json().then((json) => {
                    if (json.statusCode === 200 && json.data.favorites) {
                        dispatch({type: 'FAVORITES_LOADED', payload: json.data.favorites})
                    }
                });
            })
            .catch(err => {
                console.log('there was an error', err);
                // dispatch({type: 'UPCOMINGS_TODAY_REJECTED', payload: err});
            })
    }
}


export function loadFavorites() {
    return function (dispatch, getState) {
        return fetch(`${API_DETAILS.URL}/get-favorites`, {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            redirect: 'follow',
            referrer: 'no-referrer',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: API_DETAILS.TOKEN
            })
        })
            .then((res) => {
                res.json().then((json) => {
                    if (json.statusCode === 200 && json.data.favorites) {
                        dispatch({type: 'FAVORITES_LOADED', payload: json.data.favorites})
                    }

                });
            })
            .catch(err => {
                console.log('there was an error', err);
                // dispatch({type: 'UPCOMINGS_TODAY_REJECTED', payload: err});
            })
    }
}