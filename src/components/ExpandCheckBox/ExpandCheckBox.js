import React from 'react';
import PropTypes from 'prop-types';
import {CheckBox} from '../CheckBox';
import './ExpandCheckBox.scss';

export class ExpandCheckBox extends React.Component {

  static propTypes = {
    menu: PropTypes.array.isRequired,
    checkItem: PropTypes.func.isRequired,
    toggleExpand: PropTypes.func.isRequired
  };


  constructor(props) {
    super(props);

    this.state = {
      menu: []
    };

    this.checkItem = this.checkItem.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  checkItem(item, indexArray) {
    // console.log('expand-item:', item);
    // console.log('expand-index:', indexArray);

    this.props.checkItem(item, indexArray);
  }

  toggleExpand(item, indexArray) {

    this.props.toggleExpand(item, indexArray);
  }

  render() {
    const {menu} = this.props;

    return (
      <div className="expand-check-box">
        {
          menu.map((item, i) => {   // first menu
            const {children} = item;
            const first = <CheckBox key={`first${i}`} item={item}
                                    checkItem={(item) => this.checkItem(item, [i])}
                                    toggleExpand={(item) => this.toggleExpand(item, [i])}/>;
            let second = null;

            if (children.length > 0 && item.expand) {
              second = children.map((secondItem, j) => {  // second menu
                const {children} = secondItem;
                const second = <CheckBox key={`second${j}`} item={secondItem}
                                         checkItem={(item) => this.checkItem(item, [i, j])}
                                         toggleExpand={(item) => this.toggleExpand(item, [i, j])}/>;
                let third = null;

                if (children.length > 0 && secondItem.expand) {  // third menu

                  // third = <Radio data={children} changeRadio={(k, item) => this.changRadio(item, [i, j, k])}/>;
                  third = children.map((thirdItem, k) => (
                    <CheckBox key={`third${k}`} item={thirdItem}
                              checkItem={(item) => this.checkItem(item, [i, j, k])}
                              toggleExpand={(item) => this.toggleExpand(item, [i, j, k])}/>
                  ));

                }

                return (
                  <div className="expand-check-box__second-elem" key={j} style={{width: 165}}>
                    {
                      second
                    }
                    <div className="expand-check-box__third-elem" style={{width: 145}}>
                      {
                        third
                      }
                    </div>
                  </div>
                );
              });
            }

            return (
              <div className="root-elem" key={i}>
                {
                  first
                }
                {
                  second
                }
              </div>
            );
          })
        }
      </div>
    );
  }
}