import React, {createContext, useState} from 'react';

interface ContextProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  uid: string;
  setUid: React.Dispatch<React.SetStateAction<string>>;
}

const initialContextValue: ContextProps = {
  name: '',
  setName: () => {}, // We can set an initial function here if needed
  uid: '',
  setUid: () => {},
};

const UserContext = createContext<ContextProps>(initialContextValue);

const UserProvider = ({children}: any) => {
  const [name, setName] = useState('');
  const [uid, setUid] = useState('');
  const contextValue = {name, setName, uid, setUid};
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export {UserContext, UserProvider};
