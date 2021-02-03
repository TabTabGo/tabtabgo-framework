import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { AuthenticationContext } from '@tabtabgo/core/providers/AuthenticationProvider';

const Logout = ({ redirectPath }) => {
  const [processing, setProcessing] = useState(false);
  const { logout } = useContext(AuthenticationContext);
  useEffect(() => {
    setProcessing(true);
    logout()
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('logout error', error);
      })
      .finally(() => {
        setProcessing(false);
      });
  }, []);

  if (processing) {
    return <div>Logout..</div>;
  }

  return <Redirect to={redirectPath ? redirectPath : '/login'} />;
};

Logout.propTypes = {
  redirectPath: PropTypes.string,
};
export default Logout;
