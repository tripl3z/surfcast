import {createReducer} from 'reduxsauce';
import {Types} from "../actions/weatherPage";

const INITIAL_STATE = {
	currentProperty: 'swell',
	isLoading: true,
	swellInfo: null,
	tideInfo: null,
	sunsetInfo: null,
};

const selectWeatherProperty = (state = INITIAL_STATE, action) => {
	return {
		...state,
		currentProperty: action.propertyType
	};
};

const spotWeatherRequest = (state = INITIAL_STATE, action) => {
	return {
		...state,
		isLoading: true
	};
};

const spotWeatherSuccess = (state = INITIAL_STATE, action) => {
	return {
		...state,
		isLoading: false,
		swellInfo: action.swellInfo,
		sunsetInfo: action.sunsetInfo,
		tideInfo: action.tideInfo,
		windInfo: action.windInfo
	};
};

const spotWeatherError = (state = INITIAL_STATE, action) => {
	return {
		...state,
		isLoading: true
	};
};

const HANDLERS = {
	[Types.SELECT_WEATHER_PROPERTY]: selectWeatherProperty,
	[Types.SPOT_WEATHER_REQUEST]: spotWeatherRequest,
	[Types.SPOT_WEATHER_SUCCESS]: spotWeatherSuccess,
	[Types.SPOT_WEATHER_ERROR]: spotWeatherError
};

export default createReducer(INITIAL_STATE, HANDLERS);
