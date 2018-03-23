import {h, Component} from 'preact';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import EmptyStub from "./empty-stub";
import {Creators as commonDataCreators} from '../../actions/commonData';

import config from '../../config';
import style from './style.scss';
import FavoritesList from "./favoriets-list";

class FavoritesPage extends Component {
	componentWillMount() {
		this.props.loadItems();
	}

	_handleClickAddFavoriteSpot = () => {
		this.props.history.replace('/explore');
	};

	_handleRemoveItem = (spotId) => {
		this.props.removeItem(spotId);
	};

	_handleSelectItem = (spotId) => {
		this.props.setActiveSpot(spotId);
	};

	render({isLoading, items, activeSpotId}) {
		if (isLoading || items.length === 0) {
			return (
				<div class={style.favoritesPage}>
					<EmptyStub
						onClickAddSpot={this._handleClickAddFavoriteSpot}
					/>
				</div>
			);
		}

		return (
			<div class={style.favoritesPage}>
				<FavoritesList
					items={items}
					activeItemId={activeSpotId}
					onRemoveItem={this._handleRemoveItem}
					onSelectItem={this._handleSelectItem}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const {commonData} = state;

	const favorites = commonData.favorites.map(spotId => {
		return config.spots.find(spot => spot.id === spotId);
	});

	return {
		isLoading: commonData.isFavoritesLoading,
		items: favorites,
		activeSpotId: commonData.activeSpotId
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loadItems: () => {dispatch(commonDataCreators.loadFavorites());},
		removeItem: (spotId) => {dispatch(commonDataCreators.removeFromFavorites(spotId));},
		setActiveSpot: (spotId) => {dispatch(commonDataCreators.setActiveSpot(spotId));}
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FavoritesPage));
