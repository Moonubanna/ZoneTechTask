import React, {useEffect} from 'react';
import {BookContext} from '../../contexts';
import CreateEditDriver from './CreateEditDriver';

const WorldPage = ({navigation, route}) => {
  useEffect(() => {}, []);

  return (
    <BookContext.Provider value={{navigation, route}}>
      <CreateEditDriver />
    </BookContext.Provider>
  );
};

export default WorldPage;
