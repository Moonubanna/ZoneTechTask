import React, {useEffect} from 'react';
import {BookContext} from '../../contexts';
import Home from './Home';

const WorldPage = ({navigation, route}) => {
  useEffect(() => {}, []);

  return (
    <BookContext.Provider value={{navigation, route}}>
      <Home />
    </BookContext.Provider>
  );
};

export default WorldPage;
