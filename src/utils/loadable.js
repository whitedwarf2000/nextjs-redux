import React from 'react';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const loadable = (desktopImport, mobileImport) => {
  const CurrentComponent =
    publicRuntimeConfig.VIEWPORT_ENV === 'mobile' ? mobileImport : desktopImport;

  // eslint-disable-next-line react/display-name
  return props => (CurrentComponent ? <CurrentComponent {...props} /> : <></>);
};

export default loadable;
