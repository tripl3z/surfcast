import config from '../config';

export default {
	getFavorites: async () => {
		const data = localStorage.getItem('favorites');

		if (!data) {
			return [];
		}

		return JSON.parse(data);
	},

	removeFromFavorites: async (spotId) => {
		const data = localStorage.getItem('favorites');

		if (!data) {
			return [];
		}

		const favorites = JSON.parse(data);
		const newFavorites = favorites.filter(id => id !== spotId);
		localStorage.setItem('favorites', JSON.stringify(newFavorites));

		return newFavorites;
	},

	addToFavorites: async (spotId) => {
		let data = localStorage.getItem('favorites');

		if (!data) {
			data = '[]';
		}

		const favorites = JSON.parse(data);

		if (favorites.includes(spotId)) {
			return favorites;
		}

		favorites.push(spotId);
		localStorage.setItem('favorites', JSON.stringify(favorites));

		return favorites;
	},

	getWeatherData: async (spotId) => {

		const localResult = config.localWeatherRequests[String(spotId)];
		if (localResult) {
			return localResult;
		}

		const url = 'http://magicseaweed.com/api/' + config.apiKey + '/forecast/?spot_id=' + spotId + '&units=uk';
		let result = await fetch(url, {
			credentials: 'omit'
		});
		result = await result.json();

		return result;
	},

	getSunsetData: async (lat, lng) => {

		const localResult = config.localSunsetRequests[String(lat)];
		if (localResult) {
			return localResult.results;
		}

		const url = 'https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + lng + '&date=today'
		let result = await fetch(url);
		result = await result.json();

		return result.results;
	}
};
