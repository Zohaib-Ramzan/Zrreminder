import React, {createContext, useState} from 'react';

interface ContextProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const initialContextValue: ContextProps = {
  name: '',
  setName: () => {}, // We can set an initial function here if needed
};

const NameContext = createContext<ContextProps>(initialContextValue);

const NameProvider = ({children}: any) => {
  const [name, setName] = useState('');
  const contextValue = {name, setName};
  return (
    <NameContext.Provider value={contextValue}>{children}</NameContext.Provider>
  );
};

export {NameContext, NameProvider};
