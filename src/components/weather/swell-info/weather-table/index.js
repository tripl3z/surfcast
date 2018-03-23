import {h, Component} from 'preact';
import style from './style.scss';

class WeatherTable extends Component {
	render({items}) {
		return (
			<table class={style.weatherTable}>
				<thead>
					<tr>
						{
							items.map(item => (
								<td valign="bottom">
									{item.time}
								</td>
							))
						}
					</tr>
				</thead>
				<tbody>
					<tr>
						{
							items.map(item => (
								<td>
									<div class={`${style["msw-sw"]} ${style['msw-sw-' + item.weatherIcon]}`}/>
									<div>{`${item.temperature}°`}</div>
								</td>
							))
						}
					</tr>
				</tbody>
			</table>
		);
	}
}

export default WeatherTable;
