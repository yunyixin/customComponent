import React from 'react';
import PropTypes from 'prop-types';
import './Radio.scss';

export class Radio extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    changeRadio: PropTypes.func.isRequired
  };

  static defaultProps = {
    data: [{text: '一级', checked: true}, {text: '二级', checked: false}, {text: '三级', checked: false}],
    changeRadio: () => {
    }
  };
  // constructor(props) {
  //   super(props);
  //
  //   this.changeRadio = this.changeRadio.bind(this);
  // }
  //
  // changeRadio(index) {
  //   this.props.changeRadio(index);
  // }

  render() {
    const {data, changeRadio} = this.props;

    return (
      <div className="radio-lists">
        {
          data.map((item, i) => (
            <div key={i} className="custom-radio">
              <div className="custom-radio__circle" onClick={() => changeRadio(item)}></div>
              <div className="custom-radio__checked" data-checked={item.checked}></div>
              <label>{item.text.length > 6 ? `${item.text.substr(0, 6)}...` : item.text}</label>
            </div>
          ))
        }
      </div>
    );
  }
}