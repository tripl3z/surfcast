import {h, Component} from 'preact';
import style from './style.scss';

import Chartist from 'chartist';
import ChartistGraph from 'react-chartist';
import 'chartist/dist/scss/chartist.scss';

import arrowIcon from '../../../../assets/icons/arrow.svg';


class WindChart extends Component {
	constructor() {
		super();
		this.state = {
			activeColumnIndex: 0
		};
	}

	_handleDraw = (data) => {
		if (data.type === 'point') {
			this._handleDrawPoint(data);
		}
	};

	_handleDrawPoint = (drawData) => {

		if (drawData.index === 0
			|| drawData.index === this.props.data.primaryDirection.length - 1) {

			drawData.element.remove();
			return;
		}

		let item = this.props.data.primaryDirection[drawData.index];


		const image = new Chartist.Svg('image', {
			'xlink:href': arrowIcon,
			width: 20,
			height: 20,
			x: drawData.x - 10,
			y: drawData.y - 10,
			transform: `rotate(${item.direction},${drawData.x + 10},${drawData.y + 10})`
		});


		drawData.element.replace(image).parent();
	};

	_handleClickColumn = (columnIndex) => (e) => {
		e.stopPropagation();
		this.setState({
			activeColumnIndex: columnIndex
		});
	};

	render({}, {activeColumnIndex}) {

		const primaryDirection = this.props.data.primaryDirection;

		let data = {
			labels: [primaryDirection.map(item => '' + item.height)],
			series: [
				primaryDirection.map((item, index) => {
					return item.height === 0 ? null : item.height;
				})
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
				showLabel: true,
				showGrid: false,
				labelOffset: {
					x: 30,
					y: 0
				}
			},
			showGrid: false,
			showLabel: false,
			fullWidth: true,
			showArea: false,
			lineSmooth: false,
			offset: 0,
			width: '100%',
			height: '100%',
			chartPadding: {
				top: 50,
				left: -40,
				right: 0,
				bottom: 0
			},
			classNames: {
				area: 'tide-chart-area',
				line: 'tide-chart-line'
			}
		};

		const primaryDirectionElement = primaryDirection[activeColumnIndex + 1];
		return (
			<div class={style.windChart}>
				<div class={style.chart}>
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
						<tbody>
							<tr>
								{
									[0,1,2,3,4,5,6,7,8].map(index => (
										<td data-active={index === activeColumnIndex}/>
									))
								}
							</tr>
						</tbody>
					</table>
					<table>
						<tr>
							{
								[0,1,2,3,4,5,6,7,8].map(index => (
									<td onClick={this._handleClickColumn(index)}/>
								))
							}
						</tr>
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
				<div class={style.infoTable}>
					<ul>
						<li><span>•</span>{`${primaryDirectionElement.height} at ${primaryDirectionElement.period}s ${primaryDirectionElement.compassDirection} ${primaryDirectionElement.direction}°`}</li>
						<li><span>•</span>NA</li>
						<li><span>•</span>NA</li>
					</ul>
					<ul>
						<li><span>•</span>NA</li>
						<li><span>•</span>NA</li>
						<li><span>•</span>NA</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default WindChart;
