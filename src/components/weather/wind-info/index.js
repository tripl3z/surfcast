import {h, Component} from 'preact';
import style from './style.scss';
import WindChart from "./wind-chart";
import moment from 'moment';

class WindInfo extends Component {
	render({spotName, data}) {
		return (
			<div class={style.windInfo}>
				<h1>
					Model Forecast for {moment().format("MMM Do YY")}
				</h1>
				<h1>
					Swell (ft) <span>{spotName}</span>
				</h1>
				<WindChart
					data={data}
				/>
			</div>
		);
	}
}

export default WindInfo;
