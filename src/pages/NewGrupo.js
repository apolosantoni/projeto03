import React, {useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {OrientationLocker} from 'react-native-orientation-locker';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('window');
const Demo = {
  jogadores: {
    id: 15,
    lista: [
      {id: 1, nome: 'nome 1', pref: true, capitao: false},
      {id: 2, nome: 'nome 2', pref: false, capitao: false},
      {id: 3, nome: 'nome 3', pref: false, capitao: false},
      {id: 4, nome: 'nome 4', pref: false, capitao: false},
      {id: 5, nome: 'nome 5', pref: false, capitao: false},
      {id: 6, nome: 'nome 6', pref: false, capitao: false},
      {id: 7, nome: 'nome 7', pref: true, capitao: false},
      {id: 8, nome: 'nome 8', pref: false, capitao: false},
      {id: 9, nome: 'nome 9', pref: false, capitao: false},
      {id: 10, nome: 'nome 10', pref: false, capitao: false},
      {id: 11, nome: 'nome 11', pref: false, capitao: false},
      {id: 12, nome: 'nome 12', pref: false, capitao: false},
      {id: 13, nome: 'nome 13', pref: true, capitao: false},
      {id: 14, nome: 'nome 14', pref: false, capitao: false},
      {id: 15, nome: 'nome 15', pref: false, capitao: false},
    ],
  },
  grupos: {
    id: 0,
    config: {
      prefPorGrupo: true,
      prefProGrupoNumero: 1,
      capitao: false,
    },
    lista: [],
  },
};
const Initial = {
  jogadores: {
    id: 0,
    lista: [],
  },
  grupos: {
    id: 0,
    config: {
      prefPorGrupo: true,
      prefProGrupoNumero: 1,
      capitao: false,
    },
    lista: [],
  },
};
const Cores = {
  background: 'papayawhip',
  foreground: 'navajowhite',
  buttonBackground: 'dodgerblue',
  buttonForeground: 'papayawhip',
  textNormal: 'black',
  textDestaque: 'white',
};

const NewGrupo = ({navigation}) => {
  //listas
  const [dataJogadores, setDataJogadores] = useState(Initial.jogadores);
  const [dataGrupos, setDataGrupos] = useState(Initial.grupos);
  const [dataJogadoresSave, setDataJogadoresSave] = useState(null);

  //placar
  const [pontoA, setPontoA] = useState(0);
  const [pontoB, setPontoB] = useState(0);

  //Menus
  const [addNomesMenu, setAddNomesMenu] = useState(false);
  const [grupoManual, setGrupoManual] = useState(false);
  const [modalMenu, setModalMenu] = useState(false);
  const [modalPlacar, setModalPlacar] = useState(false);

  //variaveis auxiliares
  const [offset, setOffset] = useState(0);
  const [tmpDataNome, setTmpDataNome] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  //let selectedIndex = 0;
  const scrollViewRef = useRef(null);
  var tmp_nome;

  //* Controles de menus */
  const toggleModalMenu = () => {
    setModalMenu(!modalMenu);
  };

  const toggleAddNomeLista = () => {
    setAddNomesMenu(!addNomesMenu);
  };

  const toggleGrupo = index => {
    //  selectedIndex = index;
    setSelectedIndex(index);
    setGrupoManual(!grupoManual);
  };

  const toggleModalPlacar = () => {
    setModalPlacar(!modalPlacar);
  };

  const toPage = screenIndex => {
    scrollViewRef.current?.scrollTo({
      x: width * screenIndex,
      animated: true,
    });
  };

  /** Funções */
  function addNomesNew() {
    if (tmp_nome.trim() !== '') {
      if (tmp_nome.includes(',')) {
        const arrayNames = tmp_nome.split(',');
        //        setNomes([...nomes, ...arrayNames]);
        arrayNames.map((name, index) =>
          setDataJogadores(prevState => {
            const ultimoId = dataJogadores.id + 1;
            const tmp_data = {
              id: ultimoId + index,
              nome: name,
              pref: false,
              capitao: false,
            };
            return {
              ...prevState,
              lista: [...prevState.lista, {...tmp_data}],
              id: ultimoId + arrayNames.length,
            };
          }),
        );
      } else {
        setDataJogadores(prevState => {
          const ultimoId = dataJogadores.id + 1;
          const tmp_data = {
            id: ultimoId,
            nome: tmp_nome,
            pref: false,
            capitao: false,
          };
          return {
            ...prevState,
            lista: [...prevState.lista, {...tmp_data}],
            id: ultimoId,
          };
        });
      }
      tmp_nome = '';
      setAddNomesMenu(false);
    }
    //setNomesLista(...'', nomes);
  }

  function addGroupManual() {
    let numeroGrupos = Math.floor(nomes.length / 6);
    var tmp_grupos = [];
    if (numeroGrupos > 1 && grupos.length <= numeroGrupos - 1) {
      Alert.alert('Nuemro Grupos', `${numeroGrupos}`);
      setGrupos([...grupos, tmp_grupos]);
    }
  }

  const generateGroupsNames = id => {
    /** Ao criar grupos automaticamente a lista é salva. */
    setDataJogadoresSave(dataJogadores.lista);

    const novosNomes = [];

    if (dataGrupos.config.prefPorGrupo) {
      let jogadoresComPref = dataJogadores.lista.filter(j => j.pref);
      let jogadoresSemPref = dataJogadores.lista.filter(j => !j.pref);

      // Embaralhar os arrays para garantir aleatoriedade
      jogadoresComPref = embaralharArray(jogadoresComPref);
      jogadoresSemPref = embaralharArray(jogadoresSemPref);

      // Adicionar um jogador com pref: true
      //novosNomes.push(jogadoresComPref.shift());
      while (
        novosNomes.length <= dataGrupos.config.prefProGrupoNumero &&
        jogadoresComPref.length > 0
      ) {
        novosNomes.push(jogadoresComPref.shift());
      }
      // Adicionar até 5 jogadores sem pref: true
      while (novosNomes.length < 6 && jogadoresSemPref.length > 0) {
        novosNomes.push(jogadoresSemPref.shift());
      }
      setDataJogadores(prevState => ({
        ...prevState,
        lista: [...jogadoresComPref, ...jogadoresSemPref],
      }));
    } else {
      let jogadores = embaralharArray(jogadores.lista);

      while (novosNomes.length < 6 && jogadores.length > 0) {
        novosNomes.push(jogadores.shift());
      }
      setDataJogadores(prevState => ({
        ...prevState,
        lista: [...jogadores],
      }));
    }

    //console.log(novosNomes);

    // define os grupos para serem manipulados.
    setDataGrupos(prevState => ({
      ...prevState,
      lista: [
        ...prevState.lista.filter(item => item.id !== id),
        {id: id, nomes: novosNomes},
      ],
    }));
    //console.log(dataGrupos.lista[0].map(t => t));
  };

  const generateGroups = () => {
    /** Ao criar grupos automaticamente a lista é salva. */
    setDataJogadoresSave(dataJogadores.lista);
    let jogadoresComPref = dataJogadores.lista.filter(j => j.pref);
    let jogadoresSemPref = dataJogadores.lista.filter(j => !j.pref);

    // Embaralhar os arrays para garantir aleatoriedade
    jogadoresComPref = embaralharArray(jogadoresComPref);
    jogadoresSemPref = embaralharArray(jogadoresSemPref);

    const novosGrupos = []; // cria array temporario para manipular grupos
    let grupoId = dataGrupos.id; //pega o ultimo registro de id.

    // Cria lista iniciando com os nomes pref. para assegurar que cada grupo contenha 1
    for (i = 1; i <= Math.floor(dataJogadores.lista.length / 6); i++) {
      const grupo = {id: ++grupoId, nomes: []};
      // Adicionar um jogador com pref: true
      grupo.nomes.push(jogadoresComPref.shift());

      // Adicionar até 5 jogadores sem pref: true
      while (grupo.nomes.length < 6 && jogadoresSemPref.length > 0) {
        grupo.nomes.push(jogadoresSemPref.shift());
      }
      // adiciona os grupos sorteados no array
      novosGrupos.push(grupo);
    }

    // while (jogadoresComPref.length > 0) {
    //   const grupo = {id: ++grupoId, nomes: []};
    //   // Adicionar um jogador com pref: true
    //   grupo.nomes.push(jogadoresComPref.shift());

    //   // Adicionar até 5 jogadores sem pref: true
    //   while (grupo.nomes.length < 6 && jogadoresSemPref.length > 0) {
    //     grupo.nomes.push(jogadoresSemPref.shift());
    //   }

    //   novosGrupos.push(grupo);
    // }

    // Atualizar o estado com os novos grupos

    //Salva os jogadores nao selecionados para a lista de jogadores para ficar aguardando.
    setDataJogadores(prevState => ({
      ...prevState,
      lista: [...jogadoresComPref, ...jogadoresSemPref],
    }));

    // define os grupos para serem manipulados.
    setDataGrupos(prevState => ({
      ...prevState,
      id: grupoId,
      lista: [...prevState.lista, ...novosGrupos],
    }));
  };

  // Função para embaralhar um array
  const embaralharArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const clearGroupsNames = id => {
    let dataTmp = dataGrupos.lista.filter(item => item.id == id);
    let dataTmp2 = dataTmp[0].nomes;
    //console.log(dataTmp[0].nomes.length);
    //dataTmp2.push(dataTmp[0].nomes);
    //console.log(dataTmp2);

    setDataJogadores(prevState => ({
      ...prevState,
      lista: [...prevState.lista, ...dataTmp2],
    }));

    setDataGrupos(prevState => ({
      ...prevState,
      lista: [
        ...prevState.lista.filter(item => item.id !== id),
        {id: id, nomes: []},
      ],
    }));
  };

  const removeNomeGroup = index =>
    Alert.alert('Grupos', `Remover Grupo ${index} ?`, [
      {
        text: 'Sim',
        style: 'default',
        onPress: () => {
          let dataTmp = dataGrupos.lista.filter(item => item.id == index);
          let dataTmp2 = dataTmp[0].nomes;
          //console.log(dataTmp[0].nomes.length);
          //dataTmp2.push(dataTmp[0].nomes);
          //console.log(dataTmp2);

          setDataJogadores(prevState => ({
            ...prevState,
            lista: [...prevState.lista, ...dataTmp2],
          }));
          setDataGrupos(prevState => ({
            ...prevState,
            lista: [...dataGrupos.lista.filter(item => item.id !== index)],
          }));
          // //setGrupos(grupos.filter((item, idx) => idx !== index));
          setSelectedIndex(-1);
        },
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);

  const removeGroup = index =>
    Alert.alert('Grupos', `Remover Grupo ${index} ?`, [
      {
        text: 'Sim',
        style: 'default',
        onPress: () => {
          let dataTmp = dataGrupos.lista.filter(item => item.id == index);
          let dataTmp2 = dataTmp[0].nomes;
          //console.log(dataTmp[0].nomes.length);
          //dataTmp2.push(dataTmp[0].nomes);
          //console.log(dataTmp2);

          setDataJogadores(prevState => ({
            ...prevState,
            lista: [...prevState.lista, ...dataTmp2],
          }));
          setDataGrupos(prevState => ({
            ...prevState,
            lista: [...dataGrupos.lista.filter(item => item.id !== index)],
          }));
          // //setGrupos(grupos.filter((item, idx) => idx !== index));
          setSelectedIndex(-1);
        },
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);

  /** Views  */

  const ViewNomes = () => {
    return (
      <View style={styles.viewColunas}>
        <>
          {/** Header*/}
          <View style={[styles.header, {flexDirection: 'column'}]}>
            <View style={styles.headerLine}>
              <TouchableOpacity
                onPress={toggleModalMenu}
                style={styles.buttonIconSquare}>
                <Feather name="menu" size={32} color={'black'} />
              </TouchableOpacity>
              <Text style={styles.headerText}>Aguardando</Text>
              <TouchableOpacity onPress={() => toPage(1)}>
                <Feather name="users" size={32} color={'black'} />
              </TouchableOpacity>
            </View>
          </View>
        </>
        <>
          {/** Menu*/}
          <View style={styles.addNomeContainer}>
            <View style={{flexDirection: 'row', columnGap: 10}}>
              <TouchableOpacity onPress={toggleAddNomeLista}>
                <Feather name="user-plus" size={32} color={'white'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDataJogadoresSave(dataJogadores.lista)}
                disabled={dataJogadores.lista.length <= 0}>
                <Feather
                  name="save"
                  size={32}
                  color={
                    dataJogadores.lista.length <= 0 ? 'lightgray' : 'white'
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDataJogadores(prevState => ({
                    ...prevState,
                    lista: dataJogadoresSave,
                  }));
                }}
                disabled={dataJogadoresSave == null}>
                <Feather
                  name="folder"
                  size={32}
                  color={dataJogadoresSave == null ? 'lightgray' : 'white'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setDataJogadores(prevState => ({
                    ...prevState,
                    lista: [],
                  }))
                }
                disabled={dataJogadores.lista.length < 0}>
                <Feather
                  name="trash"
                  size={32}
                  color={dataJogadores.lista.length > 0 ? 'white' : 'lightgray'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </>
        <>
          {/** Lista */}
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.scrollContainerView}>
              {dataJogadores.lista &&
                dataJogadores.lista.map &&
                //Listagem dos nomes
                dataJogadores.lista
                  ?.sort((a, b) => (a.id > b.id ? 1 : -1))
                  .map(item => (
                    <View
                      key={item?.id}
                      style={[
                        styles.itemLista,
                        {
                          backgroundColor: item?.pref
                            ? 'plum'
                            : 'mediumslateblue',
                        },
                      ]}>
                      <TouchableOpacity
                        onPress={() => {
                          const tmp_data = {
                            id: item.id,
                            nome: item.nome,
                            pref: !item.pref,
                            capitao: item.capitao,
                          };
                          setDataJogadores(prevState => ({
                            ...prevState,
                            lista: prevState.lista.map(jogador =>
                              jogador.id === item.id
                                ? {...jogador, ...tmp_data}
                                : jogador,
                            ),
                          }));
                        }}>
                        <Feather
                          name={item?.pref ? 'user-check' : 'user'}
                          size={25}
                          color={'white'}
                        />
                      </TouchableOpacity>
                      <Text
                        style={[
                          styles.itemListaText,
                          {textTransform: 'capitalize'},
                        ]}>
                        {item?.nome}
                      </Text>
                      <TouchableOpacity
                        style={{position: 'absolute', right: 10}}
                        onPress={() =>
                          Alert.alert(
                            `Remover id: ${item.id}`,
                            `Deseja remover o nome : ${item.nome}`,
                            [
                              {
                                text: 'Sim',
                                style: 'default',
                                onPress: () =>
                                  setDataJogadores(prevState => ({
                                    ...prevState,
                                    lista: prevState.lista.filter(
                                      jogador => jogador.id !== item.id,
                                    ),
                                  })),
                              },
                              {
                                text: 'Não',
                                style: 'cancel',
                              },
                            ],
                          )
                        }>
                        <Icon
                          name="delete-forever-outline"
                          size={30}
                          color={'white'}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
            </View>
          </ScrollView>
        </>
      </View>
    );
  };

  let checkGrupoNomes = id => {
    let count = dataGrupos.lista?.filter(item => item.id == id);
    //console.log('checkGrupoNomes' && count[0].nomes.length);
    let ret = false;
    if (count.length > 0 && count[0].nomes.length > 0) {
      ret = true;
    }
    return ret;
  };

  let checkGrupos = id => {
    let count = dataGrupos.lista;
    let ret = false;
    if (count[0].nomes.length > 0) {
      ret = true;
    }
    return ret;
  };

  let checkNomes = () => {
    let count = dataJogadores.lista.length;

    let ret = false;
    if (count.length > 0) {
      ret = true;
    }
    return ret;
  };

  const ViewGrupos = () => {
    return (
      <View style={styles.viewColunas}>
        <>
          {/** Header*/}
          <View style={[styles.header, {flexDirection: 'column'}]}>
            <View style={styles.headerLine}>
              <TouchableOpacity onPress={() => toPage(0)}>
                <Feather name="list" size={32} color={'black'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                style={[
                  styles.buttonIconSquare,
                  {flexDirection: 'row', columnGap: 10, alignItems: 'center'},
                ]}>
                <Feather name="menu" size={32} color={'black'} />
                <Text style={styles.headerText}>Grupos</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toPage(2)}>
                <Icon name="scoreboard-outline" size={32} color={'black'} />
              </TouchableOpacity>
            </View>
          </View>
        </>
        <>
          {/** Menu */}
          <View style={styles.addNomeContainer}>
            <View
              style={{
                width: '80%',
                flexDirection: 'row',
                columnGap: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{alignItems: 'center', rowGap: -5}}
                onPress={() =>
                  setDataGrupos(prevState => {
                    const ultimoId = dataGrupos.id + 1;
                    const tmp_grupo = {
                      id: ultimoId,
                      nomes: [],
                    };
                    return {
                      ...prevState,
                      lista: [...prevState.lista, {...tmp_grupo}],
                      id: ultimoId,
                    };
                  })
                }
                disabled={
                  dataGrupos.lista.length >=
                  Math.floor(dataJogadores.lista.length / 6)
                }>
                <IconMaterial
                  name="group"
                  size={32}
                  color={
                    dataGrupos.lista.length >=
                    Math.floor(dataJogadores.lista.length / 6)
                      ? 'lightgray'
                      : 'white'
                  }
                />
                <Text
                  style={{
                    color:
                      dataGrupos.lista.length >=
                      Math.floor(dataJogadores.lista.length / 6)
                        ? 'lightgray'
                        : 'white',
                    fontSize: 12,
                  }}>
                  Criar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{alignItems: 'center', rowGap: -5}}
                onPress={generateGroups}
                disabled={dataGrupos.lista.length > 0}>
                <Feather
                  name="zap"
                  size={32}
                  color={dataGrupos.lista.length > 0 ? 'lightgray' : 'white'}
                />
                <Text
                  style={{
                    color: dataGrupos.lista.length > 0 ? 'lightgray' : 'white',
                    fontSize: 12,
                  }}>
                  Gerar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{alignItems: 'center', rowGap: -5}}
                onPress={() => {
                  setDataGrupos(prevState => ({
                    ...prevState,
                    lista: [],
                  }));
                  setDataJogadores(prevState => ({
                    ...prevState,
                    lista: dataJogadoresSave,
                  }));
                }}
                disabled={dataGrupos.lista.length <= 0}>
                <IconMaterial
                  name="group-off"
                  size={32}
                  color={dataGrupos.lista.length <= 0 ? 'lightgray' : 'white'}
                />
                <Text
                  style={{
                    color: dataGrupos.lista.length <= 0 ? 'lightgray' : 'white',
                    fontSize: 12,
                  }}>
                  Limpar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
        <>
          {/** Lista */}
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.scrollContainerGrupo}>
              <>
                {/* Grupos */}
                {dataGrupos.lista &&
                  dataGrupos.lista.map &&
                  dataGrupos.lista
                    ?.sort((a, b) => (a.id > b.id ? 1 : -1))
                    .map(item => (
                      <View key={item.id} style={styles.grupoContainer}>
                        <TouchableOpacity
                          onPress={() => toggleGrupo(item.id)}
                          onLongPress={() => removeGroup(item.id)}>
                          <View style={styles.grupoHeader}>
                            <Text style={styles.grupoHeaderText}>
                              Grupo {item.id}
                            </Text>
                            <Feather
                              style={{paddingLeft: 10}}
                              name="edit"
                              size={22}
                              color={'black'}
                            />
                          </View>
                        </TouchableOpacity>
                        <>
                          {/* Nomes no grupo */}
                          {item.nomes?.map(lista => (
                            <View key={lista.id}>
                              <TouchableOpacity
                                onPress={() => {}}
                                style={{
                                  paddingHorizontal: 5,
                                  justifyContent: 'space-between',
                                  flexDirection: 'row',
                                  columnGap: 10,
                                }}>
                                <Feather
                                  name={lista.pref ? 'user-check' : 'user'}
                                  size={25}
                                  color={'black'}
                                />
                                <Text style={{fontSize: 18}}>{lista.nome}</Text>
                              </TouchableOpacity>
                            </View>
                          ))}
                        </>
                      </View>
                    ))}
              </>
            </View>
          </ScrollView>
        </>
      </View>
    );
  };

  const DisplayPlacar = ({nameEquipe, ponto = 0, pontoPlus, pontoMinus}) => {
    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text style={{color: 'white', fontSize: 50, lineHeight: 60}}>
            {nameEquipe}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={pontoPlus} onLongPress={pontoMinus}>
            <Text
              style={{
                color: '#232323',
                fontSize: 220,
                lineHeight: 220,
                fontFamily: 'Digital Display',
                position: 'absolute',
              }}>
              00
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 220,
                lineHeight: 220,
                fontFamily: 'Digital Display',
              }}>
              {ponto < 10 ? ' ' + ponto : ponto}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{color: 'white', fontSize: 30, lineHeight: 30}}>
            X-X-X
          </Text>
        </View>
      </View>
    );
  };

  const ViewPlacar = () => {
    return (
      <View
        style={[
          styles.placarView,
          {
            backgroundColor: 'black',
          },
        ]}>
        <>
          {/**Header */}
          <View style={styles.placarHeader}>
            <TouchableOpacity onPress={() => toPage(1)}>
              <Icon name="page-previous-outline" size={32} color={'white'} />
            </TouchableOpacity>
            <Text style={{color: 'white'}}>Placar</Text>
            <TouchableOpacity onPress={toggleModalPlacar}>
              <Icon name="format-list-checks" size={32} color={'white'} />
            </TouchableOpacity>
          </View>
        </>
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <DisplayPlacar
              nameEquipe={'Equipe A'}
              ponto={pontoA}
              pontoPlus={() => setPontoA(pontoA + 1)}
              pontoMinus={() => setPontoA(pontoA - 1)}
            />
            <DisplayPlacar
              nameEquipe={'Equipe B'}
              ponto={pontoB}
              pontoPlus={() => setPontoB(pontoB + 1)}
              pontoMinus={() => setPontoB(pontoB - 1)}
            />
          </View>
        </>
      </View>
    );
  };

  /** Menus */

  const Menu = () => {
    return (
      <Modal
        isVisible={modalMenu}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={styles.modalMenu}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Menu</Text>
              <TouchableOpacity onPress={toggleModalMenu}>
                <Icon name="close" size={30} color={'black'} />
              </TouchableOpacity>
            </View>
            <View style={[styles.modalSection, {flexDirection: 'column'}]}>
              <>
                <ScrollView>
                  <View
                    style={{
                      width: '100%',
                      marginTop: 10,
                      backgroundColor: 'white',
                      rowGap: 20,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setDataJogadores(Demo.jogadores);
                        setDataGrupos(Demo.grupos);
                        setDataJogadoresSave(null);
                        setPontoA(0);
                        setPontoB(0);
                        toggleModalMenu;
                      }}
                      style={{
                        backgroundColor: 'lightgray',
                        borderRadius: 7,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'black'}}>
                        Carregar demonstrativo
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setDataJogadores(Initial.jogadores);
                        setDataGrupos(Initial.grupos);
                        setDataJogadoresSave(null);
                        setPontoA(0);
                        setPontoB(0);
                        toggleModalMenu;
                      }}
                      style={{
                        backgroundColor: 'lightgray',
                        borderRadius: 7,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'black'}}>Resetar dados</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const MenuUserAdd = () => {
    return (
      <Modal
        isVisible={addNomesMenu}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={styles.modalMenu}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Adicionar Nome </Text>
              <TouchableOpacity onPress={toggleAddNomeLista}>
                <Icon name="close" size={30} color={'black'} />
              </TouchableOpacity>
            </View>
            <View style={[styles.modalSection, {flexDirection: 'column'}]}>
              <>
                <View
                  style={{
                    width: '100%',
                    marginTop: 10,
                    backgroundColor: 'white',
                    borderWidth: 1,
                  }}>
                  <TextInput
                    style={{
                      fontSize: 18,
                      height: 50,
                      textAlignVertical: 'top',
                    }}
                    value={tmp_nome}
                    onChangeText={v => (tmp_nome = v)}
                    onEndEditing={() => addNomesNew()}
                    placeholder="Entre com o(s) nome(s)"
                  />
                </View>
              </>
              <>
                {/* Aguardando */}
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    paddingVertical: 10,
                  }}>
                  <Text style={{fontSize: 18}}>
                    Para adicionar multiplos nomes basta separar os nomes por
                    virgula.
                  </Text>
                  <Text style={{fontSize: 18}}>
                    Para definir como prioritario clique no icone antes do nome.
                  </Text>
                  <Text style={{fontSize: 18}}>
                    Para definir como Capitão clique no icone depois do nome.
                  </Text>
                </View>
              </>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const MenuPlacar = () => {
    return (
      <Modal
        isVisible={modalPlacar}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={[styles.modalMenu, {transform: [{rotate: '90deg'}]}]}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Configuração </Text>
              <TouchableOpacity onPress={toggleModalPlacar}>
                <Icon name="close" size={30} color={'black'} />
              </TouchableOpacity>
            </View>
            <View style={[styles.modalSection, {flexDirection: 'column'}]}>
              <>
                <ScrollView>
                  <View
                    style={{
                      width: '100%',
                      marginTop: 10,
                      backgroundColor: 'white',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setPontoA(0);
                        setPontoB(0);
                        setModalPlacar(false);
                      }}
                      style={{
                        backgroundColor: 'lightgray',
                        borderRadius: 7,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'black'}}>Resetar placar</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const MenuGrupo = () => {
    return (
      <Modal
        isVisible={grupoManual}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={styles.modalMenu}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>
                Grupo | {selectedIndex}
              </Text>
              <TouchableOpacity onPress={() => toggleGrupo(-1)}>
                <Icon name="close" size={30} color={'black'} />
              </TouchableOpacity>
            </View>
            <View style={[styles.modalSection, {flexDirection: 'column'}]}>
              <>
                {/* Equipe */}
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 5,
                  }}>
                  <Text style={{fontSize: 18}}>Equipe</Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 100,
                    backgroundColor: 'white',
                    borderWidth: 1,
                  }}>
                  <ScrollView
                    contentContainerStyle={{
                      width: '100%',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      rowGap: 7,
                      columnGap: 10,
                      padding: 5,
                    }}>
                    {dataGrupos.lista
                      ?.filter(listas => listas.id === selectedIndex)
                      .map(item =>
                        item.nomes.map(nome => (
                          <View
                            key={nome.id}
                            style={{
                              width: '47%',
                              height: 25,
                              paddingHorizontal: 5,
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Feather
                              name={nome.pref ? 'user-check' : 'user'}
                              size={25}
                              color={'black'}
                            />
                            <Text style={{fontSize: 16, color: 'black'}}>
                              {nome.nome}
                            </Text>
                          </View>
                        )),
                      )}
                  </ScrollView>
                </View>
              </>
              <>
                {/* Aguardando */}
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10,
                  }}>
                  <Text style={{fontSize: 18}}>Aguardando</Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 100,
                    backgroundColor: 'white',
                    borderWidth: 1,
                  }}>
                  <ScrollView
                    contentContainerStyle={{
                      width: '100%',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap: 10,
                      padding: 10,
                    }}>
                    {dataJogadores &&
                      dataJogadores.lista.map &&
                      dataJogadores.lista?.map(item => (
                        <View
                          key={item?.id}
                          style={{
                            width: '47%',
                            height: 25,
                          }}>
                          <TouchableOpacity
                            style={{
                              paddingHorizontal: 5,
                              flexDirection: 'row',
                              alignItems: 'center',
                              columnGap: 5,
                            }}
                            onPress={() =>
                              Alert.alert(
                                `item : ${item.id}`,
                                `Nome : ${item.nome}`,
                              )
                            }>
                            <Feather
                              style={{width: 25}}
                              name={item?.pref ? 'user-check' : 'user'}
                              size={22}
                              color={'black'}
                            />
                            <Text
                              style={{
                                fontSize: 16,
                                color: 'black',
                                textTransform: 'capitalize',
                              }}>
                              {item?.nome}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                  </ScrollView>
                </View>
              </>
              <>
                {/* Opções*/}
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10,
                    marginBottom: 10,
                  }}>
                  <Text style={{fontSize: 18, marginBottom: 10}}>Opções</Text>
                  <View
                    style={{
                      width: '100%',
                      height: 60,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      flexDirection: 'row',
                      columnGap: 10,
                    }}>
                    <View>
                      <TouchableOpacity
                        style={styles.buttonIconRounded}
                        onPress={() => generateGroupsNames(selectedIndex)}
                        disabled={checkGrupoNomes(selectedIndex)}>
                        <Feather name="zap" size={32} />
                      </TouchableOpacity>
                      <Text>Aleatorio</Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={styles.buttonIconRounded}
                        disabled={!checkNomes}>
                        <Feather name="shuffle" size={32} />
                      </TouchableOpacity>
                      <Text>Substituir</Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={styles.buttonIconRounded}
                        onPress={() => clearGroupsNames(selectedIndex)}
                        disabled={!checkGrupoNomes(selectedIndex)}>
                        <Feather name="loader" size={32} />
                      </TouchableOpacity>
                      <Text>Limpar</Text>
                    </View>

                    <View>
                      <TouchableOpacity
                        style={styles.buttonIconRounded}
                        onPress={() => removeGroup(selectedIndex)}>
                        <Feather name="trash" size={32} />
                      </TouchableOpacity>
                      <Text>Excluir</Text>
                    </View>
                  </View>
                </View>
              </>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View styles={styles.mainContainer}>
      <OrientationLocker orientation="PORTRAIT" />
      <View style={styles.viewContainer}>
        <ScrollView
          scrollEnabled={false}
          ref={scrollViewRef}
          horizontal={true}
          contentOffset={{x: offset, y: 0}}>
          <ViewNomes />
          <ViewGrupos />
          <ViewPlacar />
        </ScrollView>
      </View>
      <Menu />
      <MenuUserAdd />
      <MenuGrupo />
      <MenuPlacar />
    </View>
  );
};

export default NewGrupo;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNomeContainer: {
    width: '100%',
    paddingVertical: 10,
    columnGap: 10,
    flexDirection: 'row',
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainerTextInput: {
    width: '90%',
    height: 40,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingLeft: 10,
  },
  viewContainer: {
    height: Math.round(height - 20),
    backgroundColor: Cores.background,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexGrow: 1,
  },
  viewColunas: {
    width: Math.round(width),
    height: Math.round(height - 20),
    backgroundColor: Cores.background,
    flexDirection: 'column',
  },
  header: {
    backgroundColor: Cores.foreground,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: '500',
    fontSize: 18,
    color: Cores.textNormal,
  },
  headerLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  buttonIconSquare: {
    //backgroundColor: Cores.buttonBackground,
    //marginLeft: 20,
    paddingHorizontal: 2,
  },
  buttonIconRounded: {
    backgroundColor: Cores.buttonBackground,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: Cores.buttonForeground,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    marginBottom: 40,
    paddingBottom: 20,
    paddingVertical: 10,
  },
  scrollContainerView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 2,
    rowGap: 5,
    justifyContent: 'space-around',
  },
  scrollContainerGrupo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 10,
    rowGap: 20,
    paddingHorizontal: 10,
  },
  itemLista: {
    width: '90%',
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 10,
    padding: 10,
    marginBottom: 5,
  },
  itemListaText: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  menuAbsoluto: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    rowGap: 10,
  },
  grupoContainer: {
    flexDirection: 'row',
    width: '48%',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: 'gray',
    rowGap: 4,
    paddingBottom: 8,
  },
  grupoHeader: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'gray',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  grupoHeaderText: {color: 'black', fontSize: 20},
  placarView: {
    top: 95,
    left: -116,
    width: Math.round(height),
    height: Math.round(width),
    backgroundColor: 'papayawhip',
    flexDirection: 'column',
    transform: [{rotate: '90deg'}],
  },
  placarHeader: {
    backgroundColor: 'black',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  modalMenu: {backgroundColor: '#000000c0'},
  modalContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  modalHeader: {
    width: '100%',
    height: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'gray',
  },
  modalHeaderText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
  modalSection: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
