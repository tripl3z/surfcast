import {createReducer} from 'reduxsauce';
import {Types} from "../actions/commonData";

const INITIAL_STATE = {
	activeSpotId: null,
	isFavoritesLoading: true,
	favorites: []
};

const setActiveSpot = (state = INITIAL_STATE, action) => {
	return {
		...state,
		activeSpotId: action.spotId
	};
};


const favoritesRequest = (state = INITIAL_STATE, action) => {
	return {
		...state,
		isFavoritesLoading: true
	};
};

const favoritesSuccess = (state = INITIAL_STATE, action) => {
	return {
		...state,
		isFavoritesLoading: false,
		favorites: action.items
	};
};

const favoritesError = (state = INITIAL_STATE, action) => {
	return {
		...state,
		isFavoritesLoading: false,
		favorites: []
	};
};


const removeFromFavoritesSuccess = (state = INITIAL_STATE, action) => {
	return {
		...state,
		favorites: action.newItems
	};
};

const addToFavoritesSuccess = (state = INITIAL_STATE, action) => {
	return {
		...state,
		favorites: action.newItems
	};
};

const HANDLERS = {
	[Types.SET_ACTIVE_SPOT]: setActiveSpot,


	[Types.FAVORITES_REQUEST]: favoritesRequest,
	[Types.FAVORITES_SUCCESS]: favoritesSuccess,
	[Types.FAVORITES_ERROR]: favoritesError,

	[Types.REMOVE_FROM_FAVORITES_SUCCESS]: removeFromFavoritesSuccess,

	[Types.ADD_TO_FAVORITES_SUCCESS]: addToFavoritesSuccess
};

export default createReducer(INITIAL_STATE, HANDLERS);
