// import 'promise-polyfill';
// import 'isomorphic-fetch';
import 'babel-polyfill';
import 'url-search-params-polyfill';
import {h, render} from 'preact';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {HashRouter, withRouter} from 'react-router-dom';

import './style';

let root;

function init() {

	if (!localStorage.getItem('favorites') || localStorage.getItem('favorites') === '[]') {
		localStorage.setItem('favorites', '[31,80,68,10,29]');
	}

	let App = require('./components/app').default;
	const store = configureStore();
	root = render(
		<Provider store={store}>
			<HashRouter>
				<App/>
			</HashRouter>
		</Provider>,

		document.body, root);
}

// register ServiceWorker via OfflinePlugin, for prod only:
if (process.env.NODE_ENV === 'production') {
	require('./pwa');
}

// in development, set up HMR:
if (module.hot) {
	//require('preact/devtools');   // turn this on if you want to enable React DevTools!
	module.hot.accept('./components/app', () => requestAnimationFrame(init) );
}

init();
