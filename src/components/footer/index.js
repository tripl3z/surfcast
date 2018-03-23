import {h, Component} from 'preact';
import {Link, Route} from 'react-router-dom';

import favoritesIcon from '../../assets/icons/star.svg';
import favoritesActiveIcon from '../../assets/icons/star-filled.svg';

import exploreIcon from '../../assets/icons/place-marker.svg';
import exploreActiveIcon from '../../assets/icons/place-marker.svg';

import weatherIcon from '../../assets/icons/weather.svg';
import weatherActiveIcon from '../../assets/icons/weather.svg';

import feedIcon from '../../assets/icons/feed.png';

import accountIcon from '../../assets/icons/account.png';

import style from './style.scss';

export default class Header extends Component {
	render() {
		return (
			<header class={style.footer}>
				<nav>
					<ul>
						<MenuLink
							to='/'
							label='Favorites'
							icon={favoritesIcon}
							activeIcon={favoritesActiveIcon}
						/>
						<MenuLink
							to='/explore'
							label='Explore'
							icon={exploreIcon}
							activeIcon={exploreActiveIcon}
						/>
						<MenuLink
							to='/weather'
							label=''
							icon={weatherIcon}
							activeIcon={weatherActiveIcon}
							className={style.weatherButton}
							activeClassName={style.weatherButtonActive}
						/>
						<MenuLink
							to='/feed'
							label='Feed'
							icon={feedIcon}
							activeIcon={feedIcon}
						/>
						<MenuLink
							to='/account'
							label='Account'
							icon={accountIcon}
							activeIcon={accountIcon}
						/>
					</ul>
				</nav>
			</header>
		);
	}
}

const MenuLink = ({label, to, icon, activeIcon, activeOnlyWhenExact = true, className=style.menuButton, activeClassName=style.menuButtonActive}) => (
	<Route path={to} exact={activeOnlyWhenExact} children={({match}) => (
		<li class={match ? activeClassName : className}>
			<Link to={to}>
				<img src={match ? activeIcon : icon} />
				<div>{label}</div>
			</Link>
		</li>
	)}/>
);
