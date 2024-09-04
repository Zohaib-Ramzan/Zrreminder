import React, {useState, createContext} from 'react';

const UserDataContext = createContext();
const UserDataProvider = ({children}) => {
  const [userData, setUserData] = useState({
    cardCategoryTitle: '',
  });
  const updateCardCategoryTitle = (title: string) => {
    setUserData(prevData => ({
      ...prevData,
      cardCategoryTitle: title
    }));
  };

  return (
    <UserDataContext.Provider value={{userData, setUserData, updateCardCategoryTitle}}>
      {children}
    </UserDataContext.Provider>
  );
};

export {UserDataContext, UserDataProvider};
