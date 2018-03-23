import {h, Component} from 'preact';
import style from './style.scss';

import Chartist from 'chartist';
import ChartistGraph from 'react-chartist';
import 'chartist/dist/scss/chartist.scss';

import highIcon from '../../../../assets/icons/high.svg';
import lowIcon from '../../../../assets/icons/low.svg';


class TideChart extends Component {
	constructor() {
		super();
		this.state = {w: 0, h: 0};
	}

	_handleDraw = (data) => {
		if (data.type === 'point') {
			this._handleDrawPoint(data);
		}
	};

	_handleDrawPoint = (drawData) => {

		let item = this.props.data[drawData.index];
		const unit = item.unit;

		let currentPointType = item.type;
		if (currentPointType === 'regular') {
			drawData.element.remove();
			return;
		}

		let icon = lowIcon;
		if (currentPointType === 'max') {
			icon = highIcon;
		}

		const image = new Chartist.Svg('image', {
			'xlink:href': icon,
			width: "20px",
			height: "20px",
			x: drawData.x - 10,
			y: drawData.y - 10
		});

		const text = new Chartist.Svg('text', {
			x: drawData.x - 15,
			y: drawData.y - 15,
			stroke: 'red',
			'font-size': 10,
			'font-weight': 'normal',
			'font-family': 'Arial'
		}, 'tide-chart-point-text').text(`${drawData.value.y}${unit}`);

		drawData.element.replace(image).parent().append(text);
	};

	render() {

		let data = {
			labels: [this.props.data.map(item => '' + item.x)],
			series: [
				this.props.data.map(item => item.y)
			]
		};

		let options = {
			low: 0,
			axisX: {
				offset: 0,
				showLabel: false,
				showGrid: false
			},
			axisY: {
				offset: 0,
				showLabel: false,
				showGrid: false
			},
			showGrid: false,
			showLabel: false,
			fullWidth: true,
			showArea: true,
			offset: 0,
			width: '100%',
			height: '100%',
			chartPadding: {
				top: 50,
				left: 0,
				right: 0,
				bottom: 0
			},
			classNames: {
				area: 'tide-chart-area',
				line: 'tide-chart-line'
			}
		};

		return (
			<div class={style.tideChart}>
				<table>
					<thead>
						<tr>
							<td>12am</td>
							<td>3am</td>
							<td>6am</td>
							<td>9am</td>
							<td>12pm</td>
							<td>3pm</td>
							<td>6pm</td>
							<td>9pm</td>
						</tr>
					</thead>
				</table>

				<ChartistGraph
					data={data}
					options={options}
					type={'Line'}
					listener={{
						'draw': this._handleDraw
					}}
				/>
			</div>
		);
	}
}

export default TideChart;
