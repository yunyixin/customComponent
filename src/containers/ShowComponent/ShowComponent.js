import React from 'react';
import {Radio, CheckBox} from '../../components';

export class ShowComponent extends React.Component {

  chooseRadio() {

  }


  render() {

    return (
      <div>
        <div>hello, this is custom component</div>
        <Radio changeRadio={this.chooseRadio}/>
        <CheckBox/>
      </div>
    );
  }
}