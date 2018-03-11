import { h, render, Component } from 'preact';

export default class Table extends Component 
{

	constructor(props)
	{
		super(props);
		this.setState({loc: props.location, dataApi: props.results});
		this.displayRow = this.displayRow.bind(this);
		
	}

	genTable = () =>
	{
	  var Temps =[];
		var today = new Date(Date.now()).setHours(0,0,0,0);
		console.log(dataApi[0]['main']['dt_txt']);
		for(var i = 0; i < this.state.dataApi.length; i++ )
		{
			if(tomorrow ==  new Date(dataAPI[i]['main']['dt_txt']).setHours(0,0,0,0))
				{Temps.push(dataAPI['list'][i]);}
		}
		this.setState({DisplayData: Temps.map(x =>x)});
	}
	
	displayRow = () =>
	{
  	  <tr>
  	  <td>{this.state.DisplayData.main.temp}</td>
  	  </tr>
	  
	}

	render()
	{
		return(
			<div>
			<table>
				{this}
			</table>
			</div>);	
	}
}