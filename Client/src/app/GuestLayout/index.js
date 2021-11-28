import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './index.module.less';

const GuestLayout = props => {
  const showRoutes = routes => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return <Route key={index} path={route.path} exact={route.exact} element={route.page} />;
      });
    }
    return result;
  };

  return (
    <div className={styles.container}>
      <Routes>{showRoutes(props.routes)}</Routes>
    </div>
  );
};

export default GuestLayout;
