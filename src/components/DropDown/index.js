import { h, render, Component } from 'preact';

export default class Search extends Component{
  constructor(props)
  {
    super(props);
    this.state = {txtVal: ''};
    this.handleChange = this.handleChange.bind(this);
    
  }
  returnLocation=()=>
  {
    return (<p>{this.state.txtVal}</p>);
  }
  
  handleChange(e)
  {this.setState({ txtVal: e.target.value});}
  
	render({clickFunction})
	{return(<div>
    <link rel="stylesheet" type="text/css" href="style.css" />
    <input type="text" value = {this.state.txtVal} id = "elTxt" onChange = {this.handleChange} class="search-box-input" placeholder="search.." />
  </div>
);
}



}