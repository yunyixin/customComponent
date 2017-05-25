import React from 'react';
import {
  Radio,
  CheckBox,
  Lists,
  Search,
  DropDown,
  ExpandCheckBox
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
      dropDownLists: [],
      menu: [{
        text: '检验项',
        checked: false,
        expand: true,
        children: [{
          text: '污染物',
          checked: false,
          expand: true,
          children: [{
            text: '总砷',
            checked: false,
            expand: false,
            children: []
          }, {
            text: '铅',
            checked: false,
            expand: false,
            children: []
          }]
        }, {
          text: '微生物',
          checked: false,
          expand: false,
          children: [{
            text: '大肠杆菌',
            checked: false,
            expand: false,
            children: []
          }, {
            text: '菌落总数',
            checked: false,
            expand: false,
            children: []
          }]
        }, {
          text: '添加剂',
          checked: false,
          expand: true,
          children: []
        }]
      }, {
        text: '厂家',
        checked: false,
        expand: false,
        children: []
      }, {
        text: '商家',
        checked: false,
        expand: false,
        children: [{
          text: '家乐福',
          checked: false,
          expand: false,
          children: []
        }, {
          text: '沃尔玛',
          checked: false,
          expand: false,
          children: []
        }]
      }]
    };

    this.state.dropDownLists = ['下拉列表1', '下拉列表2', '下拉列表3'].map((caption, i) => new ListItem({
      id: i,
      data: caption,
      component: <div>{caption}</div>
    }));

    this.chooseRadio = this.chooseRadio.bind(this);
    this.chooseCheckBox = this.chooseCheckBox.bind(this);
    this.selectDropDown = this.selectDropDown.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
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

  checkItem(item, indexArray) {
    const {menu} = this.state;

    const current = {
      ...item,
      checked: !item.checked
    };

    const level1 = function () {
      return menu.map((item, i) => {
        if (i === indexArray[0]) {
          return current;
        }
        return item;
      });
    };

    const level2 = function () {

    };

    const level3 = function () {

    };

    let newMenu = [];
    switch (indexArray.length) {
      case 1:
        newMenu = level1();
        break;
      case 2:
        newMenu = level2();
        break;
      case 3:
        newMenu = level3();
        break;
      default: break;
    }

    this.setState({menu: newMenu});
  }

  toggleExpand(item, indexArray) {

    const {menu} = this.state;

    const current = {
      ...item,
      expand: !item.expand
    };

    // indexArray.length === 1
    let currentRoot = current;
    const rootElem = menu[indexArray[0]];

    if (indexArray.length === 2) {
      const children = rootElem.children.map((item, j) => {
        if (j === indexArray[1]) {
          return current;
        }
        return item;
      });

      currentRoot = {
        ...rootElem,
        children
      };
    }

    if (indexArray.length === 3) {
      const secondChildren = rootElem.children.map((secondItem, j) => {
        if (j === indexArray[1]) {

          const thirdChildren = secondItem.children.map((thirdItem, k) => {

            if (k === indexArray[2]) {
              return current;
            }

            return thirdItem;
          });

          return {
            ...secondItem,
            children: thirdChildren
          };
        }
        return secondItem;
      });

      currentRoot = {
        ...rootElem,
        children: secondChildren
      };
    }

    const newMenu = menu.map((item, i) => {
      if (i === indexArray[0]) {
        return currentRoot;
      }
      return item;
    });

    this.setState({menu: newMenu});
  }

  render() {

    const {radioLists, checkBoxLists, caption, dropDownLists, menu} = this.state;

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
        <ExpandCheckBox menu={menu} checkItem={this.checkItem} toggleExpand={this.toggleExpand}/>
      </div>
    );
  }
}