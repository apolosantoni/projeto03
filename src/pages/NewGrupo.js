import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';

import {OrientationLocker} from 'react-native-orientation-locker';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Data} from '../assets/data/data';

const {width, height} = Dimensions.get('window');

const NewGrupo = ({navigation}) => {
  const [data, setData] = useState(Data.nomes);
  const [grupo, setGrupo] = useState([]);

  const scrollViewRef = useRef(null);
  const [offset, setOffset] = useState(0);

  const sortearGrupo = () => {
    const tempData = data;
    const shuffledData = tempData.sort(() => 0.5 - Math.random());
    const grupoSelecionado = shuffledData.slice(0, 6);

    //console.log(grupoSelecionado.map(item => item.name))
    setGrupo({...grupo, ...grupoSelecionado});
    const newData = data.filter(
      item => !grupoSelecionado.find(element => element.id == item.id),
    );
    setData(newData);
    //console.log('Grupo Criado : ' + grupo.map(item => item.name));
    //console.log('data : ' + data.map(item => item.name));
    // .filter(
    //   item => !grupoSelecionado.find(element => element.id == item.id),
    // )
  };

  const reset = () => {
    setData(Data.nomes);
    setGrupo(null);
  };
  const resultado = () => {
    console.log('Grupo Criado : ' + grupo);
    console.log('data : ' + data.map(item => item.name));
  };

  return (
    <View styles={styles.mainContainer}>
      <OrientationLocker orientation="PORTRAIT" />
      <View style={styles.listasContainer}>
        <ScrollView
          scrollEnabled={false}
          ref={scrollViewRef}
          horizontal={true}
          oncon>
          <View style={{width: '100%'}}>
            <View
              style={{
                width: '100%',
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text>Header</Text>
              <Button title="Sortear" onPress={sortearGrupo} />
              <Button title="reset" onPress={reset} />
              <Button title="resultado" onPress={resultado} />
            </View>
            <ScrollView style={{marginBottom: 25}}>
              {/*console.log(data)*/}
              {data.map(item => (
                <View key={item.id} style={{marginVertical: 2}}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: width,
                      height: 30,
                      paddingHorizontal: 10,
                      backgroundColor:
                        item.genero === 'f' ? 'darkorchid' : 'cornflowerblue',
                    }}>
                    <Icon
                      name={item.genero === 'f' ? 'woman' : 'man'}
                      size={30}
                      color={'black'}
                    />
                    <Text style={{fontSize: 20}}>{item.name}</Text>
                    {item.prioridade == 1 ? (
                      <Icon name="star" size={30} color={'yellow'} />
                    ) : (
                      <Icon name="star-outline" size={30} color={'yellow'} />
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      {/* Area para os modais menu */}
    </View>
  );
};

export default NewGrupo;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  listasContainer: {
    height: Math.round(height),
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
});
