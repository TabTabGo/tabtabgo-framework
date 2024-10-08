import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';

// core components
import parallaxStyle from './parallaxStyle';

class Parallax extends React.Component {
  constructor(props) {
    super(props);
    let windowScrollTop;
    if (window.innerWidth >= 768) {
      windowScrollTop = window.pageYOffset / 3;
    } else {
      windowScrollTop = 0;
    }
    this.state = {
      transform: 'translate3d(0,' + windowScrollTop + 'px,0)',
    };
    this.resetTransform = this.resetTransform.bind(this);
  }
  componentDidMount() {
    if (window.innerWidth >= 768) {
      var windowScrollTop = window.pageYOffset / 3;
      this.setState({
        transform: 'translate3d(0,' + windowScrollTop + 'px,0)',
      });
      window.addEventListener('scroll', this.resetTransform);
    }
  }
  componentWillUnmount() {
    if (window.innerWidth >= 768) {
      window.removeEventListener('scroll', this.resetTransform);
    }
  }
  resetTransform() {
    var windowScrollTop = window.pageYOffset / 3;
    this.setState({
      transform: 'translate3d(0,' + windowScrollTop + 'px,0)',
    });
  }
  render() {
    const { classes, filter, className, children, style, image, small } = this.props;
    const parallaxClasses = classNames({
      [classes.parallax]: true,
      [classes[filter + 'Color']]: filter !== undefined,
      [classes.small]: small,
      [className]: className !== undefined,
    });

    return (
      <div
        className={parallaxClasses}
        style={{
          ...style,
          backgroundImage: image ? 'url(' + image + ')' : null,
          ...this.state,
        }}
        ref={(ref) => (this.parallax = ref)}
      >
        {children}
      </div>
    );
  }
}

Parallax.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  filter: PropTypes.oneOf(['primary', 'rose', 'dark', 'info', 'success', 'warning', 'danger']),
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string,
  small: PropTypes.bool,
};

export default withStyles(parallaxStyle)(Parallax);
