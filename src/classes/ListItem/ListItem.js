export class ListItem {

  id; // *(String|Number)

  component; // (React.Component)

  data; // (*) associate data object

  constructor(options = {}) {
    const opts = {
      component: null,
      data: null,
      ...options
    };

    if (typeof opts.id === 'undefined') {
      throw Error('id must be set');
    }

    this.id = opts.id;
    this.component = opts.component;
    this.data = opts.data;
  }

  toObject() {
    return {
      id: this.id,
      component: this.component,
      data: this.data
    };
  }
}