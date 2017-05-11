import React from 'react';
import PropTypes from 'prop-types';
import './Search.scss';

export class Search extends React.Component {

  static propTypes = {
    onSearchClick: PropTypes.func,
    searchStyles: PropTypes.object,
    inputStyles: PropTypes.object,
    placeholder: PropTypes.string
  };

  static defaultProps = {
    onSearchClick: () => {
      console.log('开始搜索');
    },
    searchStyles: {
      margin: '0 auto'
    },
    inputStyles: {
      width: 400,
      height: 40
    },
    placeholder: 'input...'
  };

  constructor(props) {
    super(props);

    this.state = {
      value: '', menuItems: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.renderMenuItems = this.renderMenuItems.bind(this);
  }

  handleInputChange(e) {
    const key = e.target.value;
    let menuItems = [];

    console.log('key', key);

    if (key !== '') {
      menuItems = ['匹配1', '匹配2', '匹配3', '匹配4'];
    }

    this.setState({value: key, menuItems});
  }

  handleSearchClick() {
    const {value} = this.state;
    const params = {name: value};

    this.props.onSearchClick('/findByName', params);
  }

  handleSelectItem(value) {

    this.setState({value, menuItems: []});
    this.props.onSearchClick('/findByName', {name: value});
  }


  renderMenuItems() {

    const {menuItems} = this.state;

    const items = menuItems.map((name, i) => (
      <li key={i} className="search__item" onClick={() => this.handleSelectItem(name)}>
        <span>{name}</span>
      </li>
    ));

    return items;
  }


  render() {
    const {value} = this.state;
    const {inputStyles, searchStyles, placeholder} = this.props;
    const top = (+inputStyles.height - 40) / 2;

    return (
      <div className="custom-search" style={searchStyles}>
        <div className="custom-search__box">
          <input type="text" placeholder={placeholder} value={value} style={inputStyles}
                 onChange={this.handleInputChange}/>
          <div className="custom-search__button" onClick={this.handleSearchClick} style={{top}}>
            <img src="/img/map_search.png" alt/>
          </div>
        </div>
        <div className="custom-search__autocomplete" id="searchAutoComplete">
          <ul className="custom-search__autocomplete__items">
            {
              this.renderMenuItems()
            }
          </ul>
        </div>
      </div>
    );
  }
}