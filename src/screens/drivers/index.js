import React, {useEffect} from 'react';
import {BookContext} from '../../contexts';
import Drivers from './Drivers';

const WorldPage = ({navigation, route}) => {
  useEffect(() => {}, []);

  return (
    <BookContext.Provider value={{navigation, route}}>
      <Drivers />
    </BookContext.Provider>
  );
};

export default WorldPage;
