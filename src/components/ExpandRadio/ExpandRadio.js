import React, {PropTypes} from 'react';
import {CheckBox} from '../CheckBox';
import {Radio} from '../Radio';
import './ExpandRadio.scss';


export class ExpandRadio extends React.Component {


  static propTypes = {
    menu: PropTypes.array.isRequired,
    checkRadio: PropTypes.func.isRequired,
    toggleExpand: PropTypes.func.isRequired
  };

  // static defaultProps = {
  //   level: 3
  // };

  constructor(props) {
    super(props);

    this.state = {
      menu: []
    };

    this.toggleExpand = this.toggleExpand.bind(this);
    this.changRadio = this.changRadio.bind(this);
  }

  toggleExpand(item, indexClass) {

    this.props.toggleExpand(item, indexClass);
  }

  changRadio(item, indexArray, parent) {
    this.props.checkRadio(item, indexArray, parent);
  }

  render() {
    const {menu} = this.props;

    return (
      <div className="expand-box">
        {
          menu.map((item, i) => {   // first menu
            const level = item.text === '检验项' ? 3 : 4;
            const {children} = item;
            const first = <CheckBox key={`first${i}`} item={item} isCheckItem={false}
                                    indexClass={[i]}
                                    toggleExpand={this.toggleExpand}/>;
            let second = null;

            if (children.length > 0 && item.expand) {
              second = children.map((secondItem, j) => {  // second menu
                const {children} = secondItem;
                const second = <CheckBox key={`second${j}`} item={secondItem} isCheckItem={false}
                                         indexClass={[i, j]}
                                         toggleExpand={this.toggleExpand}/>;
                let third = null;

                if (children.length > 0 && secondItem.expand) {  // third menu

                  if (level === 3) {
                    third = <Radio data={children} changeRadio={(k, item) => this.changRadio(item, [i, j, k], secondItem)}/>;
                  } else {
                    third = children.map((thirdItem, k) => {
                      const {children} = thirdItem;

                      const third = <CheckBox key={`third${k}`} item={thirdItem}
                                              isCheckItem={false}
                                              indexClass={[i, j, k]}
                                              toggleExpand={this.toggleExpand}/>;

                      let four = null;

                      if (children.length > 0 && thirdItem.expand) {

                        four = <Radio data={children} changeRadio={(l, item) => this.changRadio(item, [i, j, k, l], thirdItem)}/>;

                      }
                      return (
                        <div className="expand-box__third2-elem" key={k} style={{width: 145}}>
                          {
                            third
                          }
                          <div className="expand-box__four-elem" style={{width: 130}}>
                            {
                              four
                            }
                          </div>
                        </div>
                      );
                    });
                  }
                }

                return (
                  <div className="expand-box__second-elem" key={j} style={{width: 165}}>
                    {
                      second
                    }
                    <div className="expand-box__third-elem" style={{width: 145}}>
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