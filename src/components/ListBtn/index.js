import { h, render, Component } from 'preact';
export default class listBtn extends Component {
  
  constructor(props)
  {
    super(props);
    this.setState({
      name: props.text, imgLocation: props.img, Width: props.w, Height: props.h
    });
  }
  
  render({clickFunction})
  {
    if(!clickFunction)
    {clickFunction = () => {console.log("Function not set");}}
    return(
      <li> <a onClick={clickFunction}> <img src = {this.state.imgLocation}/> </a>
      <p>{this.state.name}</p>
      
      </li>
    );
  }
  
  
}