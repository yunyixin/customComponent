import React from 'react';
import {
  Radio,
  CheckBox,
  Lists,
  Search,
  DropDown
} from '../../components';
import {ListItem} from '../../classes';
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
      }],
      caption: '下拉框',
      dropDownLists: []
    };

    this.chooseRadio = this.chooseRadio.bind(this);
    this.chooseCheckBox = this.chooseCheckBox.bind(this);
    this.selectDropDown = this.selectDropDown.bind(this);

    this.state.dropDownLists = ['下拉列表1', '下拉列表2', '下拉列表3'].map((caption, i) => new ListItem({
      id: i,
      data: caption,
      component: <div>{caption}</div>
    }));
  }

  // componentDidMount() {
  //   const dropDownLists = this.state.dropDownLists.map((caption, i) => new ListItem({
  //     id: i,
  //     component: <div>{label}</div>
  //   }));
  //
  //   this.setState({dropDownLists});
  // }

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

  selectDropDown(item) {
    // console.log(item);

    this.setState({caption: item.data});
  }

  render() {

    const {radioLists, checkBoxLists, caption, dropDownLists} = this.state;

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
        <DropDown caption={caption} items={dropDownLists} onSelect={this.selectDropDown}/>
      </div>
    );
  }
}