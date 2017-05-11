import React from 'react';
import PropTypes from 'prop-types';
import {Paginator} from '../Paginator';
import './Lists.scss';

export class Lists extends React.Component {

  static propTypes = {
    listData: PropTypes.array
  };

  static defaultProps = {
    listData: [11, 222, 333, 44]
  };

  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        page: 2,
        per_page: 3,
        total: 10
      }
    };

    this.onPage = this.onPage.bind(this);
  }

  onPage(i) {
    // console.log('onPage', i);
    const pagination = {
      ...this.state.pagination,
      page: i
    };

    this.setState({pagination});
  }

  render() {

    const {listData} = this.props;
    const {pagination} = this.state;

    return (
      <div className="custom-lists">
        <div className="custom-lists__header">
          <div className="custom-lists__index">序号</div>
          <div className="custom-lists__name">名称</div>
        </div>
        {
          listData.map((item, i) => (
            <div key={i} className="custom-lists__item">
              <div className="custom-lists__index">{i}</div>
              <div className="custom-lists__name">{item}</div>
            </div>
          ))
        }
        <div className="custom-lists__footer">
        <Paginator pagination={pagination} onPage={this.onPage}/>
        </div>
      </div>
    );
  }

}