import {h, Component} from 'preact';
import style from './style.scss';

import addIcon from '../../../assets/icons/plus-button.svg';
/**
 * @param {Function} onClickAddSpot
 */
class EmptyStub extends Component {
	render({onClickAddSpot}) {
		return (
			<div class={style.emptyStub}>
				<div class={style.content}>
					<p>Add your favorite spots.</p>
					<img
						src={addIcon}
						onClick={onClickAddSpot}
					/>
					<div class={style.appMoto}>
						<div>SurfCast</div>
						<div>the surfers app</div>
					</div>
				</div>
			</div>
		);
	}
}

export default EmptyStub;
