import React from 'react';
import PropTypes from 'prop-types';
import {PageItem} from './PageItem';
import './Paginator.scss';

// const PER_PAGE = 10;
const MAX_DEFAULT_PAGE_ITEMS = 6;

export class Paginator extends React.Component {

  static propTypes = {
    pagination: PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.shape({
        'page': PropTypes.number,
        'per_page': PropTypes.number,
        // 'records': PropTypes.number,
        'total': PropTypes.number
      })
    ]).isRequired,
    maxItems: PropTypes.number,
    onPage: PropTypes.func
  };

  static defaultProps = {
    maxItems: MAX_DEFAULT_PAGE_ITEMS,
    onPage: (/* page */) => {
    }
  };

  getPageNumbers() {
    const {maxItems, onPage} = this.props;
    const {page, total} = this.props.pagination;
    const items = [];
    let from = null;
    let to = null;
    if (total <= maxItems) {
      from = 1;
      to = total;
    } else {
      const cv = Math.floor(maxItems / 2);
      from = (page <= cv) ? 1 : page - cv;
      to = from + maxItems - 1;
      if (to > total) {
        from -= (to - total);
        to = total;
      }
    }

    for (let i = from; i <= to; ++i) {
      items.push({
        caption: `${i}`,
        active: +page === i,
        onClick: () => onPage(i)
      });
    }

    return items;
  }

  render() {
    const {onPage} = this.props;
    const {page, total} = this.props.pagination;

    const data = [
      {
        caption: '<',
        disable: page === 1,
        onClick: () => onPage(page - 1)
      },
      ...this.getPageNumbers(),
      {
        caption: '>',
        disable: page === total,
        onClick: () => onPage(page + 1)
      }
    ];

    return (
      <div className="Paginator">
        {
          data.map((item, i) => (
            <PageItem key={i} caption={item.caption} active={item.active}
                      disable={item.disable} onClick={item.onClick}/>
          ))
        }
      </div>
    );
  }
}