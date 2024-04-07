import React, {useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {OrientationLocker} from 'react-native-orientation-locker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  const [nomes, setNomes] = useState([]);
  const [newName, setNewName] = useState();

  const [nomesLista, setNomesLista] = useState(nomes);
  const [groups, setGroups] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  function addNomes() {
    if (newName.trim() !== '') {
      if (newName.includes(',')) {
        const arrayNames = newName.split(',');
        setNomes([...nomes, ...arrayNames]);
      } else {
        setNomes([...nomes, newName.trim()]);
      }
      setNewName('');
    }
  }

  const removeName = nameToRemove => {
    setNomes(nomes.filter(name => name !== nameToRemove));
  };

  const removeNameLista = nameToRemove => {
    setNomesLista(nomesLista.filter(name => name !== nameToRemove));
  };

  const refreshNomes = () => {
    //Alert.alert('Acao', 'Era para funcionar');
    setNomesLista(...'', nomes);
  };

  const generateGroups = () => {
    if (groups == null) {
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
    } else {
      Alert.alert('Adicionar Grupo', 'Função não habilitada');
    }
  };

  const removeNameFromGroup = (groupIndex, nameRemove) => {
    setRefreshing(true);
    let gFiltrado = groups.map(group => {
      let newGroup = group.filter(item => item !== nameRemove);
      return newGroup;
    });
    setGroups(gFiltrado);
    setNomesLista([...nomesLista, nameRemove]);
    setRefreshing(false);
  };

  const limparGrupos = () => {
    setGroups(null);
    setNomesLista(nomes);
  };

  return (
    <View styles={styles.mainContainer}>
      <OrientationLocker orientation="PORTRAIT" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchContainerTextInput}
          placeholder="Enter com o(s) nome(s) separado por ','"
          value={newName}
          onChangeText={text => setNewName(text)}
          onEndEditing={addNomes}
          focusable={true}
        />
        <TouchableOpacity
          onPress={addNomes}
          style={styles.searchContainerButton}>
          <Icon name="account-plus" size={20} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={styles.headerContainer}>
        <Text style={{paddingLeft: 50, fontWeight: 800, color: 'white'}}>
          Aguardando por grupo(s)
        </Text>
        {nomes.length > nomesLista.length && (
          <TouchableOpacity style={{paddingLeft: 10}} onPress={refreshNomes}>
            <Icon name="account-convert" size={22} color={'white'} />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        style={styles.containerAguardando}
        contentContainerStyle={styles.containerScrollAguardando}>
        {nomesLista &&
          nomesLista.map &&
          //Listagem dos nomes
          nomesLista?.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={
                () => Alert.alert('Ação', item) /*removeNameLista(item)*/
              }>
              <View style={styles.nomeContainer}>
                <Text style={{color: 'black'}}>{item}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <View style={[styles.dadosContainer, {flexWrap: 'wrap'}]}>
        <Text>
          Total Names :
          <Text style={{color: 'black'}}>
            {nomes.length ? nomes.length : 0}
          </Text>
        </Text>
        <Text>
          Total Grupos :
          <Text style={{color: 'black'}}>
            {Math.floor(nomes.length / 6) ? Math.floor(nomes.length / 6) : 0}
          </Text>
        </Text>
        <Text>
          Aguardando :
          <Text style={{color: 'black'}}>
            {Math.round(nomes.length / 6) >= 1
              ? Math.round(nomes.length % 6)
              : 0}
          </Text>
        </Text>
      </View>
      <View style={styles.dadosContainer}>
        <Text>
          Homens :
          <Text style={{color: 'black'}}>
            {nomes?.filter(nome => !nome.includes('*')).length >= 1
              ? nomes?.filter(nome => !nome.includes('*')).length
              : 0}
          </Text>
        </Text>
        <Text>
          Mulheres :
          <Text style={{color: 'black'}}>
            {nomes?.filter(nome => nome.includes('*')).length >= 1
              ? nomes?.filter(nome => nome.includes('*')).length
              : 0}
          </Text>
        </Text>
      </View>
      <View style={styles.containerControlGroup}>
        <TouchableOpacity
          style={[
            styles.containerControlGroupButton,
            {opacity: Math.floor(nomes.length / 6) == 0 ? 0.3 : 1},
          ]}
          disabled={Math.floor(nomes.length / 6) == 0}
          onPress={generateGroups}>
          <Text
            style={{
              color: 'white',
              paddingHorizontal: 5,
            }}>
            {groups === null ? 'Sortear Grupos' : 'Adicionar Grupo'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={limparGrupos}
          style={[
            styles.containerControlGroupButton,
            {
              opacity: Math.floor(nomes.length / 6) == 0 ? 0.3 : 1,
            },
          ]}
          disabled={groups == null}>
          <Text
            style={{
              color: 'white',
              paddingHorizontal: 5,
            }}>
            Limpar Grupo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.containerControlGroupButton,
            {
              opacity: Math.floor(nomes.length / 6) == 0 ? 0.3 : 1,
            },
          ]}
          disabled={Math.floor(nomes.length / 6) == 0}>
          <Text
            style={{
              color: 'white',
              paddingHorizontal: 5,
            }}>
            Substituir nomes
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={toggleModal}>
          <Text style={{fontWeight: 800, color: 'black'}}>Grupos</Text>
        </TouchableOpacity>
      </View>
      <View style={{}}>
        <FlatList
          contentContainerStyle={{
            paddingVertical: 10,
            paddingHorizontal: 5,
          }}
          data={groups}
          numColumns={2}
          alwaysBounceVertical={true}
          keyExtractor={(item, index) => index.toString()}
          columnWrapperStyle={{flexWrap: 'wrap'}}
          renderItem={({item, index}) => (
            <View style={styles.grupoContainer}>
              <TouchableOpacity
                style={styles.grupoHeader}
                onPress={() =>
                  //Alert.alert('Ação', 'Clicou no Grupo ' + `${index + 1}`)
                  navigation.navigate('GrupoDetail', {
                    grupo: groups[index],
                    grupoIndex: index,
                  })
                }>
                <Text style={styles.grupoTituloText}>Grupo {index + 1}:</Text>
                <Icon
                  style={{paddingLeft: 10}}
                  name="account-edit"
                  size={18}
                  color={'black'}
                />
              </TouchableOpacity>
              {item?.map((name, nameIndex) => (
                <View style={styles.grupoItem} key={nameIndex}>
                  <Text style={styles.grupoItemNomes}>{name}</Text>
                  <TouchableOpacity
                    onPress={() => {} /*removeNameFromGroup(index, name)*/}>
                    <Icon
                      style={{paddingLeft: 10}}
                      name={
                        name.includes('*') ? 'face-woman' : 'face-man-outline'
                      }
                      size={18}
                      color={'black'}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        />
      </View>
      {/*Modal */}
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        deviceHeight={500}>
        <View style={{flex: 1}}>
          <Text
            style={{
              color: 'white',
              fontSize: 42,
              lineHeight: 84,
              fontWeight: 'bold',
              textAlign: 'center',
              backgroundColor: '#000000c0',
            }}>
            I am the modal content!
          </Text>
          <TextInput value="" style={{width: 200}}></TextInput>
          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};

export default Grupo;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgoldenrodyellow',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    margin: 10,
    justifyContent: 'space-between',
  },
  searchContainerTextInput: {
    width: '85%',
    height: 40,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 15,
    marginRight: 10,
  },
  searchContainerButton: {
    backgroundColor: 'mediumslateblue',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dadosContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    justifyContent: 'space-around',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'mediumslateblue',
  },
  containerScrollAguardando: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    columnGap: 10,
    rowGap: 5,
    flexWrap: 'wrap',
    paddingBottom: 20,
  },
  containerAguardando: {
    width: '100%',
    height: 110,
    paddingVertical: 10,
    backgroundColor: 'gray',
  },
  nomeContainer: {
    backgroundColor: 'mediumpurple',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  containerControlGroup: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerControlGroupButton: {
    backgroundColor: 'mediumslateblue',
    borderRadius: 10,
    paddingVertical: 10,
  },
  grupoContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  grupoHeader: {
    width: '100%',
    backgroundColor: 'mediumslateblue',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 50,
  },
  grupoTituloText: {fontSize: 22, color: 'black'},
  grupoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    fontSize: 14,
  },
  grupoItemNomes: {
    paddingHorizontal: 5,
    fontSize: 16,
  },
});
