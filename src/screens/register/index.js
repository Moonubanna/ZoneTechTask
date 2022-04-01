import React, {useEffect} from 'react';
import {BookContext} from '../../contexts';
import Register from './Register';

const WorldPage = ({navigation, route}) => {
  useEffect(() => {}, []);

  return (
    <BookContext.Provider value={{navigation, route}}>
      <Register />
    </BookContext.Provider>
  );
};

export default WorldPage;
