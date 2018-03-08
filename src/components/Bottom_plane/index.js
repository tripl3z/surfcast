import { h, render, Component } from 'preact';
import plane_style from './plane_style';
import ListBtn from '../ListBtn';

export default class BottomPlane extends Component {
  
  constructor(props)
  {
    super(props);
  }
  
  render()
  {
    return(
    <div class ={plane_style.container}>
        <ul>
            <ListBtn img ='../../assets/icons/star.png' text= "Favorites"/>
            <ListBtn img ='../../assets/icons/explore.png' text ="Explore"/>
            <ListBtn img ='../../assets/icons/surfcastbutton.png' w = "20" h = "30"/>
            <ListBtn img ='../../assets/icons/feed.png' text ="Feed"/>
            <ListBtn img ='../../assets/icons/account.png' text ="Account"/>

        </ul>
    </div>);
  }
}