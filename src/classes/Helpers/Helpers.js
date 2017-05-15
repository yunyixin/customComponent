/* eslint-disable */
import * as _ from 'lodash';

export class Helpers {

  static getStyle(el, attr) {
    if (el.currentStyle) {
      return el.currentStyle[attr];
    } else {
      return document.defaultView.getComputedStyle(el, null)[attr];
    }
  }

  static getOffset(el) {
    let _el = el;
    let _x = 0;
    let _y = 0;
    while (_el && Helpers.getStyle(_el, 'position') === 'static' && !isNaN(_el.offsetLeft) && !isNaN(_el.offsetTop)) {
      _x += _el.offsetLeft - _el.scrollLeft;
      _y += _el.offsetTop - _el.scrollTop;
      _el = _el.offsetParent;
    }
    return {top: _y, left: _x};
  }

  /**
   * simulate post
   * @refer http://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit
   * @param path
   * @param params
   * @param method
   */
  static simulatePost(path, params, method) {
    method = method || 'post'; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    const form = document.createElement('form');
    form.setAttribute('target', '_self');
    form.setAttribute('method', method);
    form.setAttribute('action', path);

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement('input');
        hiddenField.setAttribute('type', 'hidden');
        hiddenField.setAttribute('name', key);
        hiddenField.setAttribute('value', params[key]);

        form.appendChild(hiddenField);
      }
    }

    document.body.appendChild(form);
    form.submit();
    form.remove();
  }

  /**
   * format a byte size under level
   * @param byte
   */
  static formatSize(byte = 0) {
    let result = +byte;
    let i = -1;

    if (_.isNaN(result)) {
      return byte;
    }

    do {
      i++;
      result /= 1024;
    } while (result > 1);

    const units = ['B', 'KB', 'MB', 'GB'];
    const str = (result * 1024).toString();
    const dot = str.indexOf('.');
    const intLen = (dot === -1) ? str.length : dot;

    return `${str.substr(0, intLen + 3)}${units[i]}`;
  }

  /**
   * format date by timestamp
   * @param timestamp
   */
  // static formatDate(timestamp) {
  //   return fecha.format(timestamp, 'YYYY/MM/DD HH:mm:ss');
  // }

}
