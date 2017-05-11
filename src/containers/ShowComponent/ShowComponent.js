import React from 'react';
import {
  Radio,
  CheckBox,
  Lists,
  Search
} from '../../components';
import './ShowComponent.scss';

export class ShowComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      radioLists: [{text: '一级', checked: true}, {text: '二级', checked: false}, {text: '三级', checked: false}],
      checkBoxLists: [{
        text: '复选框1',
        checked: false,
        expand: false,
        children: []
      }, {
        text: '复选框2',
        checked: false,
        expand: false,
        children: []
      }]
    };

    this.chooseRadio = this.chooseRadio.bind(this);
    this.chooseCheckBox = this.chooseCheckBox.bind(this);
  }

  chooseRadio(item) {
    // console.log('choose radio', item);
    const radioLists = this.state.radioLists.map((radio) => {
      if (radio.text === item.text) {
        return {
          ...radio,
          checked: true
        };
      }

      return {
        ...radio,
        checked: false
      };
    });

    this.setState({radioLists});
  }

  chooseCheckBox(item) {

    const checkBoxLists = this.state.checkBoxLists.map((checkBox) => {
      if (checkBox.text === item.text) {
        return {
          ...checkBox,
          checked: !checkBox.checked
        };
      }

      return checkBox;
    });

    this.setState({checkBoxLists});
  }

  render() {

    const {radioLists, checkBoxLists} = this.state;

    return (
      <div className="show-component">
        <div>hello, this is custom component</div>
        <Radio data={radioLists} changeRadio={this.chooseRadio}/>
        <div className="check-box__list">
          {
            checkBoxLists.map((item, i) => (
              <CheckBox key={i} item={item} checkItem={this.chooseCheckBox}/>
            ))
          }
        </div>
        <Lists/>
        <Search/>
      </div>
    );
  }
}