import {h, Component} from 'preact';
import GoogleMapReact from 'google-map-react';
import Portal from 'preact-portal';

import style from './style.scss';
import config from '../../config';

import SpotDialog from "./spot-dialog";
import {connect} from 'react-redux';
import {Creators as commonDataCreators} from "../../actions/commonData";

import Marker from './marker';

const Popup = ({open, into = "body", children}) => (
	open ? <Portal into={into}>{children}</Portal> : null
);

class ExplorePage extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.loadFavorites();
	}

	_handleClickMarker = (spotId) => () => {
		this.props.setActiveSpot(spotId);
	};

	_handleToggleFavorite = (spotId) => () => {
		if (this.props.favorites.includes(spotId)) {
			this.props.removeFromFavorites(spotId);
		} else {
			this.props.addToFavorites(spotId);
		}
	};


	render({activeSpotId, favorites}, {currentOpenedSpotId}) {
		return (
			<div class={style.explorePage}>
				<GoogleMapReact
					defaultCenter={{"lat": 50.2787, "lng": -3.8885}}
					apiKey={config.googleMapApiKey}
					defaultZoom={8}
				>
					{
						config.spots.map(spot => (
							<Marker
								key={spot.id}
								lat={spot.lat}
								lng={spot.lng}
								title={spot.title}
								description={spot.description}
								onClick={this._handleClickMarker(spot.id)}
								isFavorite={favorites.includes(spot.id)}
								onToggleFavorite={this._handleToggleFavorite(spot.id)}
								isActive={spot.id === activeSpotId}
							/>
						))
					}
				</GoogleMapReact>
				{
					// !!currentOpenedSpotId &&
					// <Popup open={!!currentOpenedSpotId}>
					// 	<SpotDialog
					// 		spotId={currentOpenedSpotId}
					// 		title={spot.title}
					// 		description={spot.description}
					// 		imageUrl={spot.photo}
					// 		onClose={this._handleCloseSpotDialog}
					// 		onClickOutside={this._handleCloseSpotDialog}
					// 	/>
					// </Popup>
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const {commonData} = state;
	return {
		activeSpotId: commonData.activeSpotId,
		favorites: commonData.favorites
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loadFavorites: () => {dispatch(commonDataCreators.loadFavorites());},
		addToFavorites: (spotId) => {dispatch(commonDataCreators.addToFavorites(spotId));},
		removeFromFavorites: (spotId) => {dispatch(commonDataCreators.removeFromFavorites(spotId));},
		setActiveSpot: (spotId) => {dispatch(commonDataCreators.setActiveSpot(spotId));}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ExplorePage);
