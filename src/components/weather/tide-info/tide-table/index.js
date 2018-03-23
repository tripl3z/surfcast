import {h, Component} from 'preact';
import style from './style.scss';

const testData = [
	{
		title: 'High',
		time: '4:58am',
		height: 5.5
	},
	{
		title: 'High',
		time: '4:58am',
		height: 5.5
	},
	{
		title: 'High',
		time: '4:58am',
		height: 5.5
	},
	{
		title: 'High',
		time: '4:58am',
		height: 5.5
	}
];

function getTimeByPosition(position) {
	let time;
	switch (position) {
		case 1:
			time = '12am';
			break;
		case 2:
			time = '3am';
			break;
		case 3:
			time = '6am';
			break;
		case 4:
			time = '9am';
			break;
		case 5:
			time = '12pm';
			break;
		case 6:
			time = '3pm';
			break;
		case 7:
			time = '6pm';
			break;
		case 8:
			time = '9pm';
			break;
	}

	return time;
}

class TideTable extends Component {
	render({data}) {
		return (
			<table class={style.tideTable}>
				{
					data.map((item, index) => {
						return {
							...item,
							time: getTimeByPosition(index)
						};
					})
						.filter(item => item.type !== 'regular')
						.map((item) => (
							<tr>
								<td>{item.type === 'max' ? 'High' : 'Low'}</td>
								<td>{item.time}</td>
								<td>{`${item.y}${item.unit}`}</td>
							</tr>
						))
				}
			</table>
		);
	}
}

export default TideTable;
