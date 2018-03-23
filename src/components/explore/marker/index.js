import {h, Component} from 'preact';

import style from './style.scss';

import mapMarkerIcon from '../../../assets/icons/map-marker.svg';
import mapMarkerFavoriteIcon from '../../../assets/icons/map-favorite-marker.svg';
import starIcon from '../../../assets/icons/star.svg';
import yellowStarIcon from '../../../assets/icons/star-filled-yellow.svg';


class Marker extends Component {
	render({id, title, description, isFavorite, isActive, onClick, onToggleFavorite}) {
		if (!isActive) {
			return (
				<div
					class={style.marker}
					onClick={onClick}
				>
					<img src={isFavorite ? mapMarkerFavoriteIcon : mapMarkerIcon}/>
				</div>
			);
		}

		return (
			<div class={style.markerActive}>
				<div class={style.bubble}>
					<div class={style.content}>
						<div>
							<img
								src={isFavorite ? yellowStarIcon : starIcon}
								onClick={onToggleFavorite}
							/>
							<span>{title}</span>
						</div>
						<div>{description}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Marker;
