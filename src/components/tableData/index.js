import { h, render, Component } from 'preact';

export default class tableData extends Component {
constructor(props)
{
  super(props);
  this.setState({arrTemp: props.ren});

}

render()
{return (<div>
  {this.state.arrTemp.map((x) =>(<td>{x}</td>))}
  </div>
)

}
}
