import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { Provider } from 'react-redux';
import { withRouter } from 'next/router';

import { getOrCreateStore } from 'store';

import '../public/static/scss/main.scss';

function MyApp(props) {
  const { Component, pageProps, initialReduxState } = props;

  const reduxStore = getOrCreateStore(initialReduxState);

  return (
    <React.Fragment>
      <Head>
        <title>Base Next JS with Redux</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
          key="viewport"
        />
      </Head>
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
  initialReduxState: PropTypes.object,
  router: PropTypes.object,
};

MyApp.getInitialProps = async appContext => {
  const { Component, ctx } = appContext;
  // Get or Create the store with `undefined` as initialState
  // This allows you to set a custom default initialState
  const reduxStore = getOrCreateStore();

  // Provide the store to getInitialProps of pages
  appContext.ctx.reduxStore = reduxStore;

  let appProps = {};
  if (typeof Component.getInitialProps === 'function') {
    appProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps: {
      ...appProps,
      initialReduxState: reduxStore.getState(),
    },
  };
};

export default withRouter(MyApp);
