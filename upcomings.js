import { TV_MAZE_URL, ONE_DAY_IN_MS} from "../constants/Config";

export function upcomingsToday() {
    return function (dispatch, getState) {
        dispatch({type: 'UPCOMINGS_TODAY_PENDING'});

        return fetch(`${TV_MAZE_URL}/schedule`, {
            cache: 'no-cache',
            credentials: 'same-origin',
            method: 'GET',
            redirect: 'follow',
            referrer: 'no-referrer'
        })
            .then((res) => {
                res.json().then((json) => {
                    dispatch({type: 'UPCOMINGS_TODAY_FULFILLED', payload: json})
                });
            })
            .catch(err => {
                console.log('there was an error');
                dispatch({type: 'UPCOMINGS_TODAY_REJECTED', payload: err});
            })
    }
}

export function upcomingsTomorrow() {
    return function (dispatch, getState) {
        dispatch({type: 'UPCOMINGS_TOMORROW_PENDING'});

        const tomorrow = new Date().getTime() + ONE_DAY_IN_MS;
    
        return fetch(`${TV_MAZE_URL}/schedule?date=${new Date(tomorrow).toISOString().slice(0, 10)}`, {
            cache: 'no-cache',
            credentials: 'same-origin',
            method: 'GET',
            redirect: 'follow',
            referrer: 'no-referrer'
        })
            .then((res) => {
                res.json().then((json) => {
                    dispatch({type: 'UPCOMINGS_TOMORROW_FULFILLED', payload: json})
                });
            })
            .catch(err => {
                console.log('there was an error');
                dispatch({type: 'UPCOMINGS_TOMORROW_REJECTED', payload: err});
            })
    }
}