import React, {useState, createContext} from 'react';

const UserDataContext = createContext();
const UserDataProvider = ({children}) => {
  const [userData, setUserData] = useState(null);
  return (
    <UserDataContext.Provider value={{userData, setUserData}}>
      {children}
    </UserDataContext.Provider>
  );
};

export {UserDataContext, UserDataProvider};
