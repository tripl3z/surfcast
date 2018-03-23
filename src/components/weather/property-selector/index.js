import {h, Component} from 'preact';
import style from './style.scss';

/**
 * @param {string} currentProperty 'swell', 'tide' or 'wind'
 * @param {number} width
 * @param {number} height
 * @param {function} onChangeProperty
 */
class PropertySelector extends Component {

	_handleChangeProperty = (propertyType) => (e) => {
		e.stopPropagation();
	    this.props.onChangeProperty(propertyType);
	};

	_getSwell = (isActive) => {
		return (
			<g id="TideGroup" data-group="WindGroup">
				<path
					id="Swell"
					onClick={this._handleChangeProperty('swell')}
					stroke={isActive ? "#6c5ce7" : 'transparent'}
					strokeWidth={isActive ? 8 : 0}
					fill="#393a4f"
					d="M141.5,10.3c-3.9,1.2-7.7,2.7-11.3,4.6c-7.4,3.9-19.6,15.2-24.7,22.7c-8.1,11.9-17.1,32.9-21,49.1    c-3.3,14-4.3,19.1-3.8,19.6c0.3,0.3,2.7-1,5.4-2.9c8.5-6,28.3-16.4,37.9-19.8c37.5-13.3,65.9-9.9,104.1,12.5    c18.2,10.8,45.8,35.2,56.3,49.8c5.2,7.4,6.8,6.2,2.6-2c-1.3-2.6-3.6-7.9-5.1-11.7c-5.7-14.5-17.4-37.2-26.8-51.9    c-25.3-39.7-52.2-62.6-82.7-70.2C165.2,8.4,148.4,8.4,141.5,10.3z"
				/>
				<text
					onClick={this._handleChangeProperty('swell')}
					fontSize="36px"
					fill="#fff"
					fontFamily="Arial-BoldMT, Arial"
					fontWeight="700"
					transform="translate(148.12 55.61)"
				>
					S
				</text>
			</g>
		);
	};

	_getWind = (isActive) => {
		return (
			<g id="TideGroup" data-group="WindGroup">
				<path
					id="Wind"
					onClick={this._handleChangeProperty('wind')}
					fill="#18a9fc"
					stroke={isActive ? "#6c5ce7" : 'transparent'}
					strokeWidth={isActive ? 8 : 0}
					d="M319.2,247.5c0.9-4,1.5-8,1.7-12.1c0.3-8.4-3.4-24.6-7.3-32.7c-6.3-13-19.9-31.3-32-42.7    c-10.5-9.9-14.4-13.3-15.1-13.1c-0.4,0.1-0.5,2.8-0.2,6.1c1,10.4,0,32.7-1.8,42.7c-7.2,39.1-24.4,62-62.9,83.9    c-18.4,10.4-53.4,22.1-71.3,23.9c-9,0.8-8.8,2.8,0.4,3.3c2.9,0.2,8.6,0.8,12.7,1.4c15.4,2.3,40.9,3.5,58.4,2.7    c47-2.1,80.3-13.9,102.1-36.5C309,269,317.4,254.4,319.2,247.5z"
				/>
				<text
					onClick={this._handleChangeProperty('wind')}
					fontSize="36px"
					fill="#fff"
					fontFamily="Arial-BoldMT, Arial"
					fontWeight="700"
					transform="translate(268.12 250.61)"
				>
					W
				</text>
			</g>
		);
	};

	_getTide = (isActive) => {
		return (
			<g id="TideGroup" data-group="TideGroup">
				<path
					id="Tide"
					onClick={this._handleChangeProperty('tide')}
					fill="#f3581f"
					stroke={isActive ? "#6c5ce7" : 'transparent'}
					strokeWidth={isActive ? 8 : 0}
					d="M28.5,285c3,2.8,6.2,5.3,9.6,7.5c7.1,4.5,23,9.4,32,10c14.4,1.1,37-1.6,53-6.4    c13.8-4.1,18.7-5.8,18.9-6.5c0.1-0.4-2.2-1.8-5.2-3.2c-9.5-4.4-28.4-16.3-36.1-22.9c-30.3-25.8-41.5-52.1-41.2-96.4    c0.3-21.2,7.6-57.3,15-73.7c3.8-8.2,2-9-3-1.3c-1.6,2.4-5,7.1-7.6,10.3c-9.8,12.2-23.5,33.7-31.6,49.2    c-21.7,41.8-28.1,76.5-19.4,106.7C15,265.5,23.4,280,28.5,285z"
				/>
				<text
					onClick={this._handleChangeProperty('tide')}
					fontSize="36px"
					fill="#fff"
					fontFamily="Arial-BoldMT, Arial"
					fontWeight="700"
					transform="translate(28.12 250.61)"
				>
					T
				</text>
			</g>
		);
	};

	render({currentProperty, width, height}) {
		return (
			<svg xmlns="http://www.w3.org/2000/svg"
				 version="1.1"
				 width={width + "px"}
				 height={height + "px"}
				 viewBox="0 0 330 320"
				 class={style.selector}
			>
				<g id="ContainerLayer" data-name="ContainerLayer">
					{
						this._getSwell(currentProperty === 'swell')
					}
					{
						this._getWind(currentProperty === 'wind')
					}
					{
						this._getTide(currentProperty === 'tide')
					}
				</g>

			</svg>
		);
	}
}

export default PropertySelector;
