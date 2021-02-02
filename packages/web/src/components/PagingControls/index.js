import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PagingControls.scss';

class PagingControls extends Component {
  render() {
    const {
      totalPages,
      page,
      prevPageNumber,
      nextPageNumber,
      firstPageNumber,
      lastPageNumber,
      disabled,
    } = this.props;
    const haveNext = page < totalPages;
    const havePrev = page > 1;
    const isDisabled = disabled === true;
    const isLastPage = page === totalPages;
    const isFirstPage = page === 1;
    const prevNumber = prevPageNumber ? prevPageNumber : page - 1;
    const nextNumber = nextPageNumber ? nextPageNumber : page + 1;
    const lastNumber = lastPageNumber ? lastPageNumber : totalPages;
    const firstNumber = firstPageNumber ? firstPageNumber : 1;
    return (
      <div
        className={
          this.props.className ? 'paging-controls ' + this.props.className : 'paging-controls'
        }
      >
        {isFirstPage || isDisabled ? (
          <span className="page-control icon-control-end text-muted" />
        ) : (
          <span
            className="page-control icon-control-end text-clickable"
            onClick={() => this.props.goToPage(firstNumber)}
          />
        )}
        {havePrev && !isDisabled ? (
          <span
            className="page-control icon-arrow-right text-clickable"
            onClick={() => this.props.goToPage(prevNumber)}
          />
        ) : (
          <span className="page-control icon-arrow-right text-muted" />
        )}
        <div className="pages text-light">
          <span>{totalPages}</span>
          <span>/</span>
          <span>{page}</span>
        </div>
        {haveNext && !isDisabled ? (
          <span
            className="page-control icon-arrow-left text-clickable"
            onClick={() => this.props.goToPage(nextNumber)}
          />
        ) : (
          <span className="page-control icon-arrow-left text-muted" />
        )}
        {isLastPage || isDisabled ? (
          <span className="page-control icon-control-start text-muted" />
        ) : (
          <span
            className="page-control icon-control-start text-clickable"
            onClick={() => this.props.goToPage(lastNumber)}
          />
        )}
      </div>
    );
  }
}

PagingControls.propTypes = {
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  prevPageNumber: PropTypes.number,
  nextPageNumber: PropTypes.number,
  firstPageNumber: PropTypes.number,
  lastPageNumber: PropTypes.number,
  goToPage: PropTypes.func.isRequired,
};
export default PagingControls;
