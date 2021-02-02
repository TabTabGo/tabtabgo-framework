import React from 'react';
// @material-ui/icons
import InsertChart from '@material-ui/icons/InsertChart';
import Dashboard from 'views/Dashboard';

const mainRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: InsertChart,
    component: Dashboard,
  },
  { redirect: true, path: '/', pathTo: '/dashboard' },
];
export default mainRoutes;
