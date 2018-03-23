import {h, Component} from 'preact';
import style from './style.scss';
import directionIcon from '../../../assets/icons/orientation.svg';
import Autocomplete from 'accessible-autocomplete/preact'
import config from '../../../config';

function suggest(query, syncResults) {
	syncResults(query
		? config.spots.filter(function (result) {
			return result.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
		}).map(item => item.title).filter((item, index) => index < 5)
		: []
	);
}

class Header extends Component {
	_handleSearchConfirm = (spotName) => {
		const spot = config.spots.find(item => item.title === spotName);

		if (spot) {
			setTimeout(() => {
				document.getElementById('searchAutocomplete').value = '';
			}, 1);
			this.props.onSelectSpot(spot.id);
		}
	};

	render({title, onClickDone}) {
		return (
			<div class={style.headerContainer}>
				<div class={style.header}>
					<img src={directionIcon}/>
					<div>{title}</div>
					<div
						class={style.doneButton}
						onClick={onClickDone}
					>
						DONE
					</div>
				</div>
				<div class={style.searchContainer} id='search'>
					<Autocomplete
						id='searchAutocomplete'
						placeholder='Search'
						source={suggest}
						onConfirm={this._handleSearchConfirm}
					/>
				</div>
			</div>
		);
	}
}

export default Header;
