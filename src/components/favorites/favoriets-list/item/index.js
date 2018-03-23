import {h, Component} from 'preact';
import style from './style.scss';

import starIcon from '../../../../assets/icons/star-filled-yellow.svg';

class Item extends Component {
	_handleClickRemove = (e) => {
		const {onRemove, id} = this.props;
		e.stopPropagation();
		onRemove(id);
	};

	_handleClick = (e) => {
		const {onClick, id} = this.props;
		e.stopPropagation();
		onClick(id);
	};

	render({id, isActive, photo, title}) {
		return (
			<div
				class={isActive ? style.itemActive : style.item }
				onClick={this._handleClick}
			>
				<img
					src={starIcon}
					onClick={this._handleClickRemove}
				/>
				<div>
					{title}
				</div>
			</div>
		);
	}
}

export default Item;
