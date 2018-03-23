import {createActions} from 'reduxsauce';
import apiClient from "../lib/apiClient";
import config from "../config";

///////////////////////////////////////////////////////////////////////////////
// Actions and Types
//
export const {Types, Creators} = createActions({

	resetData: null,

	selectWeatherProperty: ['propertyType'],

	loadData: loadDataFunc,
	spotWeatherRequest: ['spotId'],
	spotWeatherSuccess: ['swellInfo', 'sunsetInfo', 'tideInfo', 'windInfo'],
	spotWeatherError: ['error']

}, {
	prefix: 'WEATHER_PAGE_'
});


function getTimeByPosition(position) {
	let time;
	switch (position) {
		case 0:
			time = '12am';
			break;
		case 1:
			time = '3am';
			break;
		case 2:
			time = '6am';
			break;
		case 3:
			time = '9am';
			break;
		case 4:
			time = '12pm';
			break;
		case 5:
			time = '3pm';
			break;
		case 6:
			time = '6pm';
			break;
		case 7:
			time = '9pm';
			break;
	}

	return time;
}

function loadDataFunc(spotId, history) {
	return async (dispatch) => {
		const spot = config.spots.find(item => item.id === spotId);
		dispatch(Creators.spotWeatherRequest());
		try {
			const weatherResult = await apiClient.getWeatherData(spotId);
			const sunsetData = await apiClient.getSunsetData(spot.lat, spot.lng);


			const swellInfo = weatherResult
				.filter((item, index) => index < 8)
				.map((item, index) => {

					const condition = item.condition;
					return {
						time: getTimeByPosition(index),
						weatherIcon: condition.weather,
						unit: condition.unit,
						temperature: condition.temperature
					};
				});


			const sunsetInfo = [
				{
					title: "First Light",
					time: sunsetData.civil_twilight_begin
				},
				{
					title: "Sunrise",
					time: sunsetData.sunrise
				},
				{
					title: "Sunset",
					time: sunsetData.sunset
				}
			];


			const tideItems = weatherResult
				.filter((item, index) => index < 9)
				.map((item, index) => {
					return {
						y: item.swell.absMinBreakingHeight,
						x: item.issueTimestamp,
						unit: item.swell.unit
					};
				});

			tideItems.unshift({
				...tideItems[0]
			});

			for (let i = 1; i < tideItems.length - 1; i++) {

				let nextValue = tideItems[i + 1].y;
				let currentValue = tideItems[i].y;
				let prevValue = tideItems[i - 1].y;
				tideItems[i].type = 'regular';


				if (currentValue < nextValue
					&& currentValue <= prevValue) {

					tideItems[i].type = 'min';
					continue;
				}

				if (currentValue > nextValue && currentValue >= prevValue) {
					tideItems[i].type = 'max';
				}
			}

			tideItems[0].type = 'regular';
			tideItems[tideItems.length - 1].type = 'regular';


			//WIND INFO
			const primaryDirection = weatherResult
				.filter((item, index) => index < 9)
				.map((item, index) => {

					const primary = item.swell.components.primary;
					return {
						time: getTimeByPosition(index),
						compassDirection: primary.compassDirection,
						direction: primary.direction,
						height: primary.height,
						period: primary.period
					};
				});

			primaryDirection.unshift({
				...primaryDirection[0]
			});

			const windInfo = {
				primaryDirection
			};


			dispatch(Creators.spotWeatherSuccess(swellInfo, sunsetInfo, tideItems, windInfo));
		} catch (e) {
			dispatch(Creators.spotWeatherError(e));
			history.goBack();
		}
	};
}
