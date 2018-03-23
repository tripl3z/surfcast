import {h, Component} from 'preact';
import style from './style.scss';

class SunriseInfo extends Component {
	render({items}) {
		return (
			<table
				class={style.sunriseTable}
			>
				{
					items.map(item => (
						<tr>
							<td>
								{item.title}
							</td>
							<td>
								{item.time}
							</td>
						</tr>
					))
				}
			</table>
		);
	}
}

export default SunriseInfo;
