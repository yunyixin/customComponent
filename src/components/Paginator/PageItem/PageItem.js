import React, {PropTypes} from 'react';
import './PageItem.scss';

export class PageItem extends React.Component {

  static propTypes = {
    caption: PropTypes.string,
    active: PropTypes.bool,
    disable: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    caption: '',
    active: false,
    disable: false,
    onClick: () => {
    }
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const {active, disable, onClick} = this.props;
    if (active || disable) {
      return false;
    }
    onClick();
  }

  render() {
    const {caption, active, disable} = this.props;
    const classes = [
      'page-item___container',
      ...(!disable && active ? ['page-item___active'] : []),
      ...(disable ? ['page-item___disable'] : [])
    ];
    return (
      <div className={classes.join(' ').trim()} onClick={this.onClick}>
        {caption}
      </div>
    );
  }

}
