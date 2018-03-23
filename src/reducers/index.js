import {combineReducers} from 'redux';
import commonData from './commonData';
import weatherPage from './weatherPage';

const rootReducer = combineReducers({
	commonData,
	weatherPage
});

export default rootReducer;
