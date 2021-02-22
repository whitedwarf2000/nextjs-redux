import dynamic from 'next/dynamic';
import loadable from 'utils/loadable';

export default loadable(
  dynamic(() => import('./Home.Desktop')),
  dynamic(() => import('./Home.Mobile'))
);
