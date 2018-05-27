export const defaultState =  {
    isLoading: false,
    isLoaded: false,
    items: [],
    hasError: false,
    error: null
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'UPCOMINGS_TODAY_PENDING': {
            return {
                items: [],
                isLoaded: false,
                isLoading: true,
                hasError: false,
                error: null
            }
            break;
        }
        case 'UPCOMINGS_TODAY_FULFILLED': {
            return {
                items: action.payload.sort((a, b) => b.show.weight - a.show.weight),
                isLoaded: true,
                isLoading: false,
                hasError: false,
                error: null
            };
            break;
        }
        case 'UPCOMINGS_TODAY_REJECTED': {
            return {
                items: [],
                isLoaded: false,
                isLoading: false,
                hasError: true,
                error: action.payload
            }
        }
        default: {
            return state;
        }
    }
}