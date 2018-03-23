import {h, Component} from 'preact';

import WeatherTable from "./weather-table";
import SunriseInfo from "./sunrise-info";
import style from './style.scss';

class SwellInfo extends Component {
	render({weatherInfo, sunsetInfo}) {
		return (
			<div class={style.swellInfo}>
				<WeatherTable
					items={weatherInfo}
				/>
				<SunriseInfo
					items={sunsetInfo}
				/>
			</div>
		);
	}
}

export default SwellInfo;
