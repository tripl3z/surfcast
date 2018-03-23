import {h, Component} from 'preact';
import style from './style.scss';

class ProgressIndicator extends Component {
	render({class: className=''}) {
		return (
			<div className={style.progressIndicator + ' ' + className}>
				<p>Processing...</p>
				<div className={style.progressIndicatorLine} />
				<div className={style.progressIndicatorLine} />
				<div className={style.progressIndicatorLine} />
			</div>
		);
	}
}

export default ProgressIndicator;
