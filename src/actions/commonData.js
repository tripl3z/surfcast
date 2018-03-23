import {createActions} from 'reduxsauce';
import apiClient from '../lib/apiClient';

///////////////////////////////////////////////////////////////////////////////
// Actions and Types
//
export const {Types, Creators} = createActions({

	setActiveSpot: ['spotId'],

	addToFavorites: addToFavoritesFunc,
	addToFavoritesSuccess: ['newItems'],

	removeFromFavorites: removeFromFavoritesFunc,
	removeFromFavoritesSuccess: ['newItems'],

	loadFavorites: loadFavoritesFunc,
	favoritesRequest: ['accountId'],
	favoritesSuccess: ['items'],
	favoritesError: ['error']

}, {
	prefix: 'COMMON_DATA_'
});


function addToFavoritesFunc(spotId) {
	return async (dispatch) => {
		try {
			const newItems = await apiClient.addToFavorites(spotId);
			dispatch(Creators.addToFavoritesSuccess(newItems));
		} catch (e) {
		}
	};
}

function removeFromFavoritesFunc(spotId) {
	return async (dispatch) => {
		try {
			const newItems = await apiClient.removeFromFavorites(spotId);
			dispatch(Creators.removeFromFavoritesSuccess(newItems));
		} catch (e) {
		}
	};
}

function loadFavoritesFunc(accountId) {
	return async (dispatch) => {
		dispatch(Creators.favoritesRequest(accountId));
		try {
			const items = await apiClient.getFavorites();
			dispatch(Creators.favoritesSuccess(items));
		} catch (e) {
			dispatch(Creators.favoritesError(e));
		}
	};
}
