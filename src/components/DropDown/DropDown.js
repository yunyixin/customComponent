import React from 'react';
import PropTypes from 'prop-types';
import {ListItem, Helpers} from '../../classes';
import './DropDown.scss';

export class DropDown extends React.Component {

  static propTypes = {
    caption: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.instanceOf(ListItem)),
    onSelect: PropTypes.func
  };

  static defaultProps = {
    caption: '',
    items: [],
    onSelect: (/* item */) => {
    }
  };

  state = {
    isExpanded: false,
    disableBlur: false
  };

  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
  }

  onSelect(item) {
    this.props.onSelect(item);
    this.setState({isExpanded: false});
  }

  onBlur() {
    if (!this.state.disableBlur) {
      this.setState({isExpanded: false});
    }
  }

  getPosition() {
    const {left, top} = Helpers.getOffset(this.refs.button);
    const {height} = this.refs.button.getBoundingClientRect();

    return {
      left: `${left}px`,
      top: `${top + height}px`
    };
  }

  render() {
    const {caption, items} = this.props;
    const {isExpanded} = this.state;

    return (
      <div onBlur={this.onBlur} className="custom-dropdown">
        <button type="button" ref="button"
                className={`button ${isExpanded ? 'active' : ''}`}
                onClick={() => this.setState({isExpanded: !this.state.isExpanded})}>
          <span className="caption">{caption}</span>
          <i className="fa fa-caret-down"/>
        </button>
        {isExpanded ? (
          <ul className="dropdown" style={this.getPosition()}
              onMouseEnter={() => this.setState({disableBlur: true})}
              onMouseLeave={() => this.setState({disableBlur: false})}>
            {items.map(item => (
              <li key={item.id} onClick={() => this.onSelect(item)}>{item.component}</li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }


}