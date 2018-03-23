import {h, Component} from 'preact';

import style from './style.scss';

import closeIcon from '../../../assets/icons/star.svg';

/**
 * @param {Function} onClose
 * @param {Function} onClickOutside
 */
class SpotDialog extends Component {

	constructor(props) {
		super(props);
		this.state = {
			errors: []
		};
	}

	_handleClickOutside = (e) => {
		e.stopPropagation();
		if (e.target.className !== style.dialogContainer) {
			return;
		}

		const {onClickOutside} = this.props;

		if (onClickOutside) {
			onClickOutside();
		}
	};

	render({id, isFavorite, title, imageUrl, description, onClose}) {
		return (
			<div
				class={style.dialogContainer}
				onClick={this._handleClickOutside}
			>
				<div class={style.dialog}>
					<div class={style.content}>
						<div class={style.imageContainer}>
							<img src={imageUrl}/>
							<div class={style.info}>
								{title}
							</div>
						</div>
						<div class={style.description}>
							{description}
						</div>
					</div>
					<div class={style.footer}>
						<div>Make favorite</div>
						<div onClick={onClose}>Close</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SpotDialog;
