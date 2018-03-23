import {createActions} from 'reduxsauce';
import apiClient from "../lib/apiClient";

///////////////////////////////////////////////////////////////////////////////
// Actions and Types
//
export const {Types, Creators} = createActions({

	resetData: null,

	loadItems: loadItemsFunc,
	favoritesRequest: ['accountId'],
	favoritesSuccess: ['items'],
	favoritesError: ['error'],

	removeItem: removeFromFavoriteFunc,
	removeRequest: ['spotId'],
	removeSuccess: ['spotId'],
	removeError: ['error']
}, {
	prefix: 'FAVORITES_PAGE_'
});

function loadItemsFunc(accountId) {
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

function removeFromFavoriteFunc (spotId) {
	return async (dispatch) => {
		dispatch(Creators.removeRequest(spotId));
		try {
			const items = await apiClient.removeFromFavorites(spotId);
			dispatch(Creators.removeSuccess(spotId));
		} catch (e) {
			dispatch(Creators.removeError(e));
		}
	};
}
