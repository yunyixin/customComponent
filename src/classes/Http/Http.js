/*
import * as _ from 'lodash';
import superagent from 'superagent';
import Promise from 'bluebird';
import NProgress from 'nprogress';

// import {errorHandler} from './ErrorHandler';

// http://bluebirdjs.com/docs/api/promise.config.html
Promise.config({
  // Enable cancellation
  cancellation: true
});

export class Http {

  formatUrl(path) {
    const adjustedPath = path[0] !== '/' ? `/${path}` : path;
    const beginWith = adjustedPath.split('/')[1];

    if (__DEVELOPMENT__ && !_.includes(['assets'], beginWith)) { // eslint-disable-line no-undef
      // Prepend `/api` to relative URL, to proxy to API server.
      return `/api${adjustedPath}`;
    } else {
      return adjustedPath;
    }
  }

  onCancel(req) {
    req.abort();
    NProgress.done();
  }

  constructor(showProgress = true) {
    ['get', 'post', 'put', 'patch', 'delete'].forEach((method) => {
      this[method] = (path, {params, data, form} = {}) => {
        const promise = new Promise((resolve, reject, onCancel) => {
          const request = superagent[method](this.formatUrl(path));
          // const token = Auth.getToken();

          if (params) {
            request.query(params);
          }

          if (data) {
            request.send(data);
          }

          if (form) {
            request.send(form);
            request.set('Content-Type', 'application/x-www-form-urlencoded');
          }

          if (showProgress) {
            NProgress.start();
          }

          // authorization headers
          // request.set(AUTH_TOKEN_HEADER, token);

          request.end((err, {body} = {}) => {
            if (showProgress) {
              NProgress.done();
            }
            if (err) {
              // errorHandler(err);
              return reject(body || err);
            } else {
              return resolve(body);
            }
          });

          onCancel(() => this.onCancel(request));
        });
        promise._id = +_.uniqueId();
        return promise;
      };
    });
  }

}
*/
