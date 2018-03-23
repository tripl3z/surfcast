import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import PropertySelector from "./property-selector";
import SwellInfo from "./swell-info";
import TideInfo from "./tide-info";
import WindInfo from "./wind-info";
import SpotStub from "./spot-stub";
import Header from "./header";
import ProgressIndicator from "./progress-indicator";

import {Creators as weatherPageCreators} from "../../actions/weatherPage";
import {Creators as commonDataCreators} from "../../actions/commonData";

import config from '../../config';
import style from './style.scss';

class WeatherPage extends Component {

	componentWillMount() {
		if (this.props.activeSpotId) {
			this.props.loadData(this.props.activeSpotId, this.props.history);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.activeSpotId !== this.props.activeSpotId && nextProps.activeSpotId) {
			this.props.loadData(nextProps.activeSpotId, this.props.history);
		}
	}

	_handleClickDone = (e) => {
	    e.stopPropagation();
	    this.props.history.goBack();
	};

	_handleSelectWeatherProperty = (propertyType) => {
		this.props.selectWeatherProperty(propertyType);
	};

	_handleClickStub = () => {
	    this.props.history.replace('/explore');
	};

	_handleSelectSpot = (spotId) => {
		this.props.setActiveSpot(spotId);
	};

	render({isLoading, activeSpotId, spot, currentProperty, swellInfo, sunsetInfo, tideInfo, windInfo}) {
		if (!activeSpotId) {
			return (
				<div class={style.weatherPage}>
					<SpotStub onClick={this._handleClickStub}/>
				</div>
			);
		}

		if (isLoading) {
			return (
				<div class={style.weatherPage}>
					<Header
						title={spot.title}
						onSelectSpot={this._handleSelectSpot}
					/>
					<ProgressIndicator class={style.progress}/>
				</div>
			);
		}

		return (
			<div class={style.weatherPage}>
				<Header
					onClickDone={this._handleClickDone}
					title={spot.title}
					onSelectSpot={this._handleSelectSpot}
				/>
				<p>Very small short period waves from the E. Very strong ENE winds with blown out  conditions except for very sheltered spots.</p>
				<div class={style.propertySelectorContainer}>
					<PropertySelector
						currentProperty={currentProperty}
						width={180}
						height={180}
						onChangeProperty={this._handleSelectWeatherProperty}
					/>
				</div>
				<p class={style.propertySelectorTip}>
					Please select which information would you like to
					display <span>SWELL</span>, <span>WIND</span> or <span>TIDE</span>.
				</p>
				{
					currentProperty === 'swell' &&
					<SwellInfo
						weatherInfo={swellInfo}
						sunsetInfo={sunsetInfo}
					/>
				}
				{
					currentProperty === 'tide' &&
					<TideInfo
						spotName={spot.title}
						data={tideInfo}
					/>
				}
				{
					currentProperty === 'wind' &&
					<WindInfo
						spotName={spot.title}
						data={windInfo}
					/>
				}
			</div>

		);
	}
}

function mapStateToProps(state) {
	const {weatherPage, commonData} = state;
	const spot = config.spots.find(item => item.id === commonData.activeSpotId);

	return {
		...weatherPage,
		activeSpotId: commonData.activeSpotId,
		spot
	};
}

function mapDispatchToProps(dispatch) {
	return {
		selectWeatherProperty: (propertyType) => {dispatch(weatherPageCreators.selectWeatherProperty(propertyType));},
		loadData: (spotId, history) => {dispatch(weatherPageCreators.loadData(spotId, history));},
		setActiveSpot: (spotId) => {dispatch(commonDataCreators.setActiveSpot(spotId));}
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WeatherPage));
