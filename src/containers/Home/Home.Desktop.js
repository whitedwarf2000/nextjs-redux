import React, { useEffect } from 'react';

import { useHome } from './hooks';

const Home = () => {
  const {
    actions: { fetchHomeRequest },
    isLoading,
    homeData,
  } = useHome();

  useEffect(() => {
    fetchHomeRequest();
  }, []);

  return (
    <div>
      <h1>Home Desktop</h1>
      {isLoading ? <span>Loading...</span> : <h1>{homeData.title}</h1>}
    </div>
  );
};

export default Home;
