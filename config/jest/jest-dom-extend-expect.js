import '@testing-library/jest-dom';

import { setConfig } from 'next/config';
import generateNextConfig from '../../next.config';

setConfig({
  publicRuntimeConfig: generateNextConfig('', {}).publicRuntimeConfig,
});
