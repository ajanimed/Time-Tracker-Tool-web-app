import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span>Time Tracker Tool - Dashboard &copy; 2019 <a href="http://angelsit.ru">AngelesIT</a></span>
        <span className="ml-auto">Powered by <a href="http://angelsit.ru">AngelesIT Dev Team</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
