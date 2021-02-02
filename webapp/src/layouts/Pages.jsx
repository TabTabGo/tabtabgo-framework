import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import { withStyles, withTheme } from '@material-ui/core/styles';

// core components
import PagesHeader from './components/Header/PagesHeader';
import Footer from './components/Footer/Footer';
import SwitchRoutes from 'ttg-identity/components/Routes/SwitchRoutes';

import pagesStyle from './styles/pagesStyle';

class Pages extends React.Component {
  componentDidMount() {
    document.body.style.overflow = 'unset';
  }
  render() {
    const { classes, brand, pageRoutes, footerRoutes, ...rest } = this.props;
    var backgroundImage = this.props.theme.custom.media.backgrounds.mainPage;

    return (
      <div>
        <PagesHeader
          logo={this.props.theme.custom.media.logo.pages}
          brand={brand}
          routes={pageRoutes}
          centered
          {...rest}
        />
        <div className={classes.wrapper} ref={(ref) => (this.wrapper = ref)}>
          <div
            className={classes.fullPage}
            style={{
              backgroundImage: backgroundImage ? 'url(' + backgroundImage + ')' : null,
            }}
          >
            <SwitchRoutes routes={pageRoutes} />
            <Footer
              light={this.props.theme.palette.pages.footerWhite}
              centered
              brand={brand}
              routes={footerRoutes}
            />
          </div>
        </div>
      </div>
    );
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired,
  brand: PropTypes.shape({
    company: PropTypes.string,
    companyLink: PropTypes.string,
    name: PropTypes.string,
    shortName: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
  pageRoutes: PropTypes.array,
  footerRoutes: PropTypes.array,
  theme: PropTypes.object,
};

export default withTheme(withStyles(pagesStyle)(Pages));
