export const defaultState =  {
    isLoading: false,
    isLoaded: false,
    items: [],
    hasError: false,
    error: null
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'FAVORITES_LOADED': {
            return {
                items: action.payload,
                isLoaded: true,
                isLoading: false,
                hasError: false,
                error: null
            };
            break;
        }
        default: {
            return state;
        }
    }
}