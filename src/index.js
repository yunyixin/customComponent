import ReactDOM from 'react-dom';
import {ShowComponent} from './containers';


document.addEventListener('DOMContentLoaded', function () {

  ReactDOM.render(<ShowComponent/>, document.querySelector('#customComponent'));

});