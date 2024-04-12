import React, {createContext, useState} from 'react';

const MyContext = createContext({});
const Config = {
  placarConfigVolei: {
    pontosSet: 25,
    modoJogo: 0, //0 = amador 1 set, 1 = normal
    pontosSetDesempate: 15, // ultimo set
    diferencaVitoria: 2,
    numSets: 1,
    sets: [0, 0, 0, 0, 0],
    partida: [
      {
        nome: 'Equipe A',
        pontos: 0,
        vantagem: 0,
      },
      {
        nome: 'Equipe B',
        pontos: 0,
        vantagem: 0,
      },
    ],
  },
  futebolConfig: {},
  basqueteConfig: {},
  listaCongig: {
    nomes: [],
    aguardando: [],
    grupos: [],
  },
};

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
