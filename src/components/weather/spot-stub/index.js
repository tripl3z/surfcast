import {h, Component} from 'preact';
import style from './style.scss';

import stubIcon from '../../../assets/icons/spot-stub.svg';

class SpotStub extends Component {
	render({onClick}) {
		return (
			<div class={style.spotStub}>
				<div>
					<img
						src={stubIcon}
						onClick={onClick}
					/>
					<br />
					<p>Please select spot.</p>
				</div>
			</div>
		);
	}
}

export default SpotStub;
