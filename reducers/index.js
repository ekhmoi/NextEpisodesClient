import { combineReducers } from 'redux';
import upcomingsToday from './upcomingsTodayReducer';
import upcomingsTomorrow from './upcomingsTomorrowReducer';
import favorites from './favoritesReducer';

export default combineReducers({
    upcomingsToday,
    upcomingsTomorrow,
    favorites
});