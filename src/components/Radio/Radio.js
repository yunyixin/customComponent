import React from 'react';
import PropTypes from 'prop-types';
import './Radio.scss';

export class Radio extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    checkedIndex: PropTypes.number,
    changeRadio: PropTypes.func.isRequired
  };

  static defaultProps = {
    data: [{text: '一级'}, {text: '二级'}, {text: '三级'}],
    checkedIndex: 0,
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
              <div className="custom-radio__circle" onClick={() => changeRadio(i, item)}></div>
              <div className="custom-radio__checked" data-checked={item.checked}></div>
              <label>{item.text.length > 6 ? `${item.text.substr(0, 6)}...` : item.text}</label>
            </div>
          ))
        }
      </div>
    );
  }
}