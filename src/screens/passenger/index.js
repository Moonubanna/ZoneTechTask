import React, {useEffect} from 'react';
import {BookContext} from '../../contexts';
import Passenger from './Passenger';

const WorldPage = ({navigation, route}) => {
  useEffect(() => {}, []);

  return (
    <BookContext.Provider value={{navigation, route}}>
      <Passenger />
    </BookContext.Provider>
  );
};

export default WorldPage;
