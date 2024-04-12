import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {OrientationLocker} from 'react-native-orientation-locker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');
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

const Grupo = ({navigation}) => {
  const [nomes, setNomes] = useState(InitialValue);
  const [newName, setNewName] = useState();

  const [nomesLista, setNomesLista] = useState(nomes);
  const [groups, setGroups] = useState(null);

  const [refreshing, setRefreshing] = useState(false);
  const [modalNomeMenu, setModalNomeMenu] = useState(false);
  const [modalNomeItem, setModalNomeItem] = useState(false);
  const [modalGruposMenu, setModalGruposMenu] = useState(false);
  const [modalGruposItem, setModalGruposItem] = useState(false);
  const [modalConfiguracao, setModalConfiguracao] = useState(false);

  const [pontoA, setPontoA] = useState(0);
  const [pontoB, setPontoB] = useState(0);

  const [listaInfo, setListaInfo] = useState(false);
  const [offset, setOffset] = useState(0);
  const scrollViewRef = useRef(null);
  let screenIndex = 0;

  const toggleNomeMenu = () => {
    setModalNomeMenu(!modalNomeMenu);
  };

  const toggleNomeItem = () => {
    setModalNomeItem(!modalNomeItem);
  };

  const toggleGrupoMenu = () => {
    setModalGruposMenu(!modalGruposMenu);
  };

  const toggleGrupoItem = () => {
    setModalGruposItem(!modalGruposItem);
  };

  const toggleConfiguracao = () => {
    setModalConfiguracao(!modalConfiguracao);
  };

  function addNomes() {
    if (newName.trim() !== '') {
      if (newName.includes(',')) {
        const arrayNames = newName.split(',');
        setNomesLista([...nomesLista, ...arrayNames]);
      } else {
        setNomesLista([...nomesLista, newName.trim()]);
      }
      setNewName('');
    }
    //setNomesLista(...'', nomes);
  }

  const limparLista = () => {
    setGroups(null);
    setNomesLista('');
  };

  const salvarLista = () => {
    setNomes(nomesLista);
  };

  const novaLista = () => {
    Alert.alert(
      'Nova Lista',
      'Ira remover todos os nomes preenchidos e grupos',
      [
        {
          text: 'Confirma',
          onPress: () => {
            setNomes('');
            setGroups(null);
            setNomesLista('');
          },
          style: 'default',
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
    );
  };

  const carregarLista = () => {
    setNomesLista(nomes);
  };

  const removeNameLista = nameToRemove => {
    setNomesLista(nomesLista.filter(name => name !== nameToRemove));
  };

  const generateGroups = () => {
    if (groups == null) {
      setNomes(nomesLista);
      const numGroups = Math.floor(nomesLista.length / 6);
      let shuffledNames = [...nomesLista].sort(() => Math.random() - 0.5);
      //let shuffledNames = [...nomesLista];
      setNomesLista('');
      const newGroups = [];

      for (let i = 0; i < numGroups; i++) {
        const group = shuffledNames.slice(i * 6, (i + 1) * 6);
        newGroups.push(group);
        console.log('group ' + i + ': ' + group);
      }
      if (shuffledNames.length > 0) {
        setNomesLista(shuffledNames.slice(numGroups * 6, (numGroups + 1) * 6));
      } else {
        setNomesLista('');
      }
      setGroups(newGroups);

      scrollViewRef.current?.scrollTo({
        x: 0 * screenIndex,
        animated: true,
      });
    } else {
      Alert.alert('Adicionar Grupo', 'Função não habilitada');
    }
  };

  const removeNameFromGroup = (groupIndex, nameRemove) => {
    let gFiltrado = groups.map(group => {
      let newGroup = group.filter(item => item !== nameRemove);
      return newGroup;
    });
    setGroups(gFiltrado);
    setNomesLista([...nomesLista, nameRemove]);
  };

  const limparGrupos = () => {
    setGroups(null);
    setNomesLista(nomes);
    toggleGrupoMenu();
    toPrevioustPage();
  };

  const refreshNomes = () => {
    if (groups === null) {
      setNomesLista(nomes);
    }
  };

  const toNextPage = () => {
    screenIndex += 1;
    if (screenIndex <= 2) {
      scrollViewRef.current?.scrollTo({
        x: width * screenIndex,
        animated: true,
      });
    }
  };

  const toPrevioustPage = () => {
    console.log(screenIndex);
    screenIndex -= 1;
    if (screenIndex >= 0) {
      scrollViewRef.current?.scrollTo({
        x: width * screenIndex,
        animated: true,
      });
    } else {
      screenIndex = 1;
    }
  };

  useEffect(() => {
    refreshNomes();
  }, [nomes]);

  const ViewNomes = () => {
    return (
      <View style={styles.listaColunas}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchContainerTextInput}
            placeholder="Enter com o(s) nome(s) separado por ','"
            value={newName}
            onChangeText={text => setNewName(text)}
            onEndEditing={addNomes}
            focusable={true}
          />
        </View>
        <View style={styles.listaColunasHeader}>
          <Text>Aguardando</Text>
          <TouchableOpacity onPress={toggleNomeMenu}>
            <Icon name="information-outline" size={32} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toNextPage}>
            <Icon name="page-next-outline" size={32} color={'white'} />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{
            marginBottom: 90,
            paddingBottom: 20,
            paddingVertical: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              columnGap: 2,
              rowGap: 5,
              justifyContent: 'space-around',
            }}>
            {nomesLista &&
              nomesLista.map &&
              //Listagem dos nomes
              nomesLista?.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.listaColunasNomes,
                    {
                      backgroundColor: item.includes('*')
                        ? 'plum'
                        : 'mediumslateblue',
                    },
                  ]}>
                  <Text style={styles.listaColunasNomesText}>{item}</Text>
                  <TouchableOpacity
                    style={{marginLeft: 10, right: 10}}
                    onPress={() =>
                      Alert.alert(
                        'Remover Nome',
                        `Deseja remover o nome : ${item}`,
                        [
                          {
                            text: 'Sim',
                            style: 'default',
                            onPress: () =>
                              setNomesLista(
                                nomesLista.filter(name => name !== item),
                              ),
                          },
                          {
                            text: 'Não',
                            style: 'cancel',
                          },
                        ],
                      )
                    }>
                    <Icon
                      name={
                        item.includes('*') ? 'face-woman' : 'face-man-outline'
                      }
                      size={18}
                      color={'white'}
                    />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </ScrollView>

        <View style={styles.listaColunasFooter}>
          {!listaInfo ? (
            <View style={styles.listaColunasFooterView}>
              <Button
                title="Sortear Grupos"
                onPress={generateGroups}
                disabled={nomesLista.length < 6 || groups !== null}
              />
              <TouchableOpacity
                onPress={toggleConfiguracao}
                style={{
                  backgroundColor: 'dodgerblue',
                  marginLeft: 20,
                  paddingHorizontal: 2,
                }}>
                <Icon name="format-list-checks" size={32} color={'white'} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.listaColunasFooterView}>
              <Text>
                Nomes :<Text>10</Text>
              </Text>
              <Text>
                Grupos : <Text>2</Text>
              </Text>
              <Text>
                Homens:<Text>10</Text>
              </Text>
              <Text>
                Mulheres: <Text>2</Text>
              </Text>
              <Text>Dados</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const ViewGrupo = () => {
    return (
      <View
        style={[
          styles.listaColunas,
          {
            backgroundColor: 'azure',
          },
        ]}>
        <View style={styles.listaColunasHeader}>
          <TouchableOpacity onPress={toPrevioustPage}>
            <Icon name="page-previous-outline" size={32} color={'white'} />
          </TouchableOpacity>
          <Text>Grupos</Text>
          <TouchableOpacity onPress={toggleGrupoMenu}>
            <Icon name="format-list-checks" size={32} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toNextPage}>
            <Icon name="page-next-outline" size={32} color={'white'} />
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView style={{paddingVertical: 10, marginBottom: 60}}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                columnGap: 2,
                rowGap: 5,
              }}>
              {groups &&
                groups.map &&
                groups?.map((item, index) => (
                  <View key={index} style={styles.grupoContainer}>
                    <TouchableOpacity
                      style={styles.grupoHeader}
                      onPress={() => {}}>
                      <Text style={styles.grupoHeaderText}>
                        Grupo {index + 1}:
                      </Text>
                      <Icon
                        style={{paddingLeft: 10}}
                        name="account-edit"
                        size={22}
                        color={'black'}
                      />
                    </TouchableOpacity>
                    {item?.map((name, nameIndex) => (
                      <View
                        style={[
                          styles.grupoItem,
                          {
                            backgroundColor: name.includes('*')
                              ? 'plum'
                              : 'mediumslateblue',
                          },
                        ]}
                        key={nameIndex}>
                        <Text style={styles.grupoItemNomes}>{name}</Text>
                        <TouchableOpacity
                          onPress={
                            () => {} /*removeNameFromGroup(index, name)*/
                          }>
                          <Icon
                            style={{paddingLeft: 10}}
                            name={
                              name.includes('*')
                                ? 'face-woman'
                                : 'face-man-outline'
                            }
                            size={18}
                            color={'black'}
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                ))}
            </View>
          </ScrollView>
        </View>
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
          styles.listaColunasPlacar,
          {
            backgroundColor: 'black',
          },
        ]}>
        <View style={styles.listaColunasHeaderPlacar}>
          <TouchableOpacity onPress={toPrevioustPage}>
            <Icon name="page-previous-outline" size={32} color={'white'} />
          </TouchableOpacity>
          <Text style={{color: 'white'}}>Placar</Text>
          <TouchableOpacity onPress={toggleGrupoMenu}>
            <Icon name="format-list-checks" size={32} color={'white'} />
          </TouchableOpacity>
        </View>
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
      </View>
    );
  };

  const ModalConfiguracao = () => {
    return (
      <Modal
        isVisible={modalConfiguracao}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View
          style={{
            backgroundColor: '#000000c0',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 5,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                lineHeight: 40,
                fontWeight: 'bold',
              }}>
              Opções geracao dos grupos
            </Text>
            <TouchableOpacity onPress={toggleConfiguracao}>
              <Icon name="close-circle-outline" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: 'white', padding: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>Nomes obrigatorios por grupo :</Text>
              <Switch value={false} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>Nomes obrigatorios por grupo :</Text>
              <TextInput
                value="1"
                placeholder="1"
                disabled={true}
                editable={false}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>Numero de nomes por grupo : </Text>
              <TextInput value="6" placeholder="6" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>Sortear grupos de forma aleatoria ?</Text>
              <Switch value={true} />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const ModalNomes = () => {
    return (
      <Modal
        isVisible={modalNomeMenu}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View
          style={{
            backgroundColor: '#000000c0',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 5,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                lineHeight: 40,
                fontWeight: 'bold',
              }}>
              Opções lista nomes
            </Text>
            <TouchableOpacity onPress={toggleNomeMenu}>
              <Icon name="close-circle-outline" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 30,
              rowGap: 10,
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}>
            <View>
              <View
                style={{
                  width: '100%',
                  backgroundColor: 'dodgerblue',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '600',
                    paddingVertical: 5,
                  }}>
                  Dados
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  style={{
                    width: 120,
                  }}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text>Total nomes :</Text>
                    <Text>{nomesLista.length}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text>Total grupos :</Text>
                    <Text>{Math.floor(nomesLista.length / 6)}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text>Aguardando : </Text>
                    <Text>{Math.floor(nomesLista.length % 6)}</Text>
                  </View>
                </View>
                <View style={{width: 120}}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text>Homens :</Text>
                    <Text>
                      {nomesLista !== null &&
                      nomesLista.filter &&
                      nomesLista?.filter(
                        nomesLista => !nomesLista.includes('*'),
                      ).length >= 1
                        ? nomesLista?.filter(
                            nomesLista => !nomesLista.includes('*'),
                          ).length
                        : 0}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text>Mulheres :</Text>
                    <Text>
                      {nomesLista !== null &&
                      nomesLista.filter &&
                      nomesLista?.filter(nomesLista => nomesLista.includes('*'))
                        .length >= 1
                        ? nomesLista?.filter(nomesLista =>
                            nomesLista.includes('*'),
                          ).length
                        : 0}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Button
              title="Nova lista"
              onPress={novaLista}
              disabled={nomesLista.length <= 0}
            />
            <Button
              title="Limpar nomes"
              onPress={limparLista}
              disabled={nomesLista.length <= 0}
            />
            <Button
              title="Salvar esta lista"
              onPress={salvarLista}
              disabled={nomesLista.length <= 0}
            />
            <Button
              title="Carregar lista"
              onPress={carregarLista}
              disabled={nomes.length <= 0}
            />
            <Button
              title="Gravar lista"
              onPress={() => {}}
              disabled={nomesLista.length <= 0}
            />
            <Button title="Carregar lista antigas salvas" onPress={() => {}} />
          </View>
        </View>
      </Modal>
    );
  };

  const ModalGrupos = () => {
    return (
      <Modal
        isVisible={modalGruposMenu}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View
          style={{
            backgroundColor: '#000000c0',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                lineHeight: 40,
                fontWeight: 'bold',
              }}>
              Opções Grupos
            </Text>
            <TouchableOpacity onPress={toggleGrupoMenu}>
              <Icon name="close-circle-outline" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 30,
              rowGap: 40,
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}>
            <Button title="Limpar Grupos" onPress={limparGrupos} />
            <Button title="Sortear Novamente" onPress={toggleGrupoMenu} />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View styles={styles.mainContainer}>
      <OrientationLocker orientation="PORTRAIT" />
      <View style={styles.listasContainer}>
        <ScrollView
          scrollEnabled={false}
          ref={scrollViewRef}
          horizontal={true}
          contentOffset={{x: offset, y: 0}}
          oncon>
          <ViewNomes />
          <ViewGrupo />
          <ViewPlacar />
        </ScrollView>
      </View>
      <ModalConfiguracao />
      <ModalNomes />
      <ModalGrupos />
    </View>
  );
};

export default Grupo;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    margin: 10,
    justifyContent: 'space-between',
  },
  searchContainerTextInput: {
    width: '100%',
    height: 40,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 15,
    marginRight: 10,
    paddingLeft: 10,
  },
  searchContainerButton: {
    backgroundColor: 'white',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  listasContainer: {
    height: Math.round(height - 20),
    backgroundColor: 'papayawhip',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexGrow: 1,
  },
  listaColunas: {
    width: Math.round(width),
    height: Math.round(height - 20),
    backgroundColor: 'papayawhip',
    flexDirection: 'column',
  },
  listaColunasPlacar: {
    top: 95,
    left: -116,
    width: Math.round(height),
    height: Math.round(width),
    backgroundColor: 'papayawhip',
    flexDirection: 'column',
    transform: [{rotate: '90deg'}],
  },
  listaColunasHeader: {
    backgroundColor: 'navajowhite',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  listaColunasHeaderPlacar: {
    backgroundColor: 'black',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  listaColunasNomes: {
    height: 30,
    width: '46%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  listaColunasNomesText: {
    left: 10,
    fontSize: 16,
    color: 'white',
  },
  listaColunasNomesIcon: {},
  listaColunasNomesButton: {},
  listaColunasNomesButtonIcon: {},
  listaColunasFooter: {
    position: 'absolute',
    backgroundColor: 'navajowhite',
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
  listaColunasFooterView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  grupoContainer: {
    width: '40%',
    marginHorizontal: 10,
    marginBottom: 20,
    borderWidth: 2,
  },
  grupoHeader: {
    backgroundColor: 'peru',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    paddingHorizontal: 5,
  },
  grupoHeaderText: {fontSize: 22, color: 'black'},
  grupoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
