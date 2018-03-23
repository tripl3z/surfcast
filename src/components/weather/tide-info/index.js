import {h, Component} from 'preact';
import style from './style.scss';
import TideTable from "./tide-table";
import TideChart from "./tide-chart";

class TideInfo extends Component {
	render({spotName, data}) {
		return (
			<div class={style.tideInfo}>
				<h1>
					Tide (ft) <span>{spotName}</span>
				</h1>
				<TideChart
					data={data}
				/>
				<TideTable data={data}/>
			</div>
		);
	}
}

export default TideInfo;
