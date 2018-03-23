import {h, Component} from 'preact';
import Item from "./item";

import style from './style.scss';

class FavoritesList extends Component {
	render({items, activeItemId, onSelectItem, onRemoveItem}) {
		return (
			<div class={style.favoritesList}>
				{
					items.map(spot => (
						<Item
							key={spot.id}
							id={spot.id}
							isActive={spot.id === activeItemId}
							title={spot.title}
							onClick={onSelectItem}
							onRemove={onRemoveItem}
						/>
					))
				}
			</div>
		);
	}
}

export default FavoritesList;
