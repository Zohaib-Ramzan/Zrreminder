import React, {useState, createContext} from 'react';

const UserDataContext = createContext();
const UserDataProvider = ({children}) => {
  const [userData, setUserData] = useState({});
  const [categoriesData, setCategoriesData] = useState([]);

  return (
    <UserDataContext.Provider
      value={{
        userData,
        setUserData,
        categoriesData,
        setCategoriesData,
      }}>
      {children}
    </UserDataContext.Provider>
  );
};

export {UserDataContext, UserDataProvider};
