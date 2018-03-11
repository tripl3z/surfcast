import { h, render, Component } from 'preact';

export default class WeatherTable extends Component {
  constructor(props)
  {
    super(props);
    this.setState({weatherFile: props.jsonFile, text:props.textinfo});
    this.extractFile;
  }
  
  extractFile = () =>
  {
    var temp = this.state.weatherFile['condition']['temperature'];
    
    this.setstate({
      tem: temp
    })
  }
  
  render()
  {
    return(
      <p>{this.state.tem}</p>
    );
  }
  
  
}