// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import DropDown from '../DropDown';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		this.state.temp = "";
		this.setState({ display: true });
	}

	fetchWeatherData = () => {
		var url = "http://api.wunderground.com/api/e0b1beb7f61b54b1/conditions/q/GB/London.json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	render() {
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }> 
					{this.state.display ? <DropDown class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['current_observation']['display_location']['city'];
		var temp_c = parsed_json['current_observation']['temp_c'];
		var conditions = parsed_json['current_observation']['weather'];

		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions
		});      
	}
}
