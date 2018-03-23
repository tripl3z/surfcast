import {h, Component} from 'preact';
import {Switch, Route} from 'react-router-dom';

import Footer from '../footer';
import WeatherPage from '../weather';

import style from './style.scss';
import FavoritesPage from "../favorites";
import ExplorePage from "../explore";
import FeedPage from "../feed";
import AccountPage from "../account";

class App extends Component {
	render() {
		return (
			<div class={style.app}>
				<Switch>
					<Route exact path='/weather' component={WeatherPage}/>
					<Route exact path='/' component={FavoritesPage}/>
					<Route exact path='/explore' component={ExplorePage}/>
					<Route exact path='/feed' component={FeedPage}/>
					<Route exact path='/account' component={AccountPage}/>
				</Switch>
				<Footer/>
			</div>
		);
	}
}

export default App;
