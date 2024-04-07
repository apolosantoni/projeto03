import React, {createContext, useState} from 'react';

const MyContext = createContext({});
const InitialValue = [
  'nome 01*',
  'nome 02',
  'nome 03',
  'nome 04',
  'nome 05',
  'nome 06',
  'nome 07*',
  'nome 08',
  'nome 09',
  'nome 10',
  'nome 11',
  'nome 12',
  'nome 13*',
  'nome 14',
  'nome 15',
  'nome 16',
  'nome 17',
  'nome 18*',
  'nome 19',
  'nome 20',
  'nome 21',
  'nome 22',
];

const MyContextProvider = ({children}) => {
  const [nomes, sNomes] = useState(InitialValue);
  const [newName, setNewName] = useState('');

  function addNomes() {
    if (newName.trim() !== '') {
      if (newName.includes(',')) {
        const arrayNames = newName.split(',');
        sNomes([...nomes, ...arrayNames]);
      } else {
        sNomes([...nomes, newName.trim()]);
      }
      setNewName('');
    }
  }

  return (
    <MyContext.Provider value={{addNomes, nomes, newName, setNewName}}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
