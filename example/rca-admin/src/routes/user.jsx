import React from 'react';

import LockOpen from '@material-ui/icons/LockOpen';
import Logout from 'ttg-identity/pages/Logout';

const customizedLogout = (props) => <Logout {...props} redirectPath="/login" />;
const userRoutes = [
  {
    path: '/auth/logout',
    name: 'Logout',
    icon: LockOpen,
    component: customizedLogout,
  },
];

export default userRoutes;
