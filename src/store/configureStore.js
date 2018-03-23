import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
	const store = createStore(rootReducer, initialState, compose(
		applyMiddleware(thunk, logger),
		// add support for Redux dev tools
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));
	return store;
}
