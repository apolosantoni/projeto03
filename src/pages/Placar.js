import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Orientation, {OrientationLocker} from 'react-native-orientation-locker';

const {width, height} = Dimensions.get('window');

const Placar = ({navigation}) => {
  const dados = {
    Config: {
      pontosSet: 25,
      pontosDesempate: 15,
      diferencaVitoria: 2,
      numSets: 1,
      sets: [0, 0, 0, 0, 0],
    },
    EquipeA: {
      nome: 'Equipe A',
      pontos: 0,
      vantagem: 0,
    },
    EquipeB: {
      nome: 'Equipe B',
      pontos: 0,
      vantagem: 0,
    },
  };
  const [config, setConfig] = useState(dados.Config);
  const [equipeA, setEquipeA] = useState(dados.EquipeA);
  const [equipeB, setEquipeB] = useState(dados.EquipeB);
  const [vantagem, setVantagem] = useState('');

  const atualizarPontosPlus = tipo => {
    if (tipo === 'A') {
      if (equipeA.pontos <= 15) {
        setVantagem('A');
        setEquipeA(prevState => ({
          ...prevState,
          pontos: prevState.pontos + 1,
        }));
        //equipeA.pontos = equipeA.pontos + 1;
        console.log(equipeA);
      }
    } else {
      if (equipeB.pontos <= 15) {
        setVantagem('B');
        setEquipeB(prevState => ({
          ...prevState,
          pontos: prevState.pontos + 1,
        }));

        //equipeA.pontos = equipeA.pontos + 1;
        console.log(equipeB);
      }
    }
  };

  const atualizarPontosMinus = tipo => {
    if (tipo === 'A') {
      if (equipeA.pontos > 0) {
        //setVantagem('B');
        setEquipeA(prevState => ({
          ...prevState,
          pontos: prevState.pontos - 1,
        }));
      }
    } else {
      if (equipeB.pontos > 0) {
        //setVantagem('A');
        setEquipeB(prevState => ({
          ...prevState,
          pontos: prevState.pontos - 1,
        }));
      }
    }
  };
  const reset = () => {
    setVantagem('');
    setEquipeA(prevState => ({
      ...prevState,
      pontos: 0,
    }));
    setEquipeB(prevState => ({
      ...prevState,
      pontos: 0,
    }));
  };

  return (
    <View style={styles.container}>
      <OrientationLocker orientation="LANDSCAPE_LEFT" />
      <Text
        style={{
          position: 'absolute',
          top: 0,
          lineHeight: 50,
          paddingHorizontal: 10,
          backgroundColor: '#c9c9c9c0',
          color: 'white',
        }}>
        Placar: Width = {Math.round(width)} Height = {Math.round(height)}
      </Text>
      <View
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={styles.containerPlacar}>
          <TouchableOpacity>
            <Text style={styles.textNome}>{equipeA.nome}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              vantagem == 'A'
                ? {borderBottomWidth: 10, borderBottomColor: 'red'}
                : {borderBottomWidth: 10, borderBottomColor: 'black'}
            }
            onPress={() => atualizarPontosPlus('A')}
            onLongPress={() => atualizarPontosMinus('A')}>
            <Text
              style={[
                styles.textNumero,
                {position: 'absolute', zIndex: 0, color: '#555'},
              ]}>
              00
            </Text>
            <Text style={[styles.textNumero, {zIndex: 1}]}>
              {equipeA.pontos < 10 ? `0${equipeA.pontos}` : equipeA.pontos}
            </Text>
          </TouchableOpacity>
          <Text style={styles.textSet}>00000</Text>
        </View>
        <View styles={{backgroundColor: 'blue', padding: 10}}>
          <TouchableOpacity
            onPress={reset}
            onLongPress={() => navigation.navigate('Inicio')}>
            <Text styles={{color: 'white'}}>Menu</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerPlacar}>
          <TouchableOpacity>
            <Text style={styles.textNome}>{equipeB.nome}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              vantagem == 'B'
                ? {borderBottomWidth: 10, borderBottomColor: 'red'}
                : {borderBottomWidth: 10, borderBottomColor: 'black'}
            }
            onPress={() => atualizarPontosPlus('B')}
            onLongPress={() => atualizarPontosMinus('B')}>
            <Text
              style={[
                styles.textNumero,
                {position: 'absolute', zIndex: 0, color: '#555'},
              ]}>
              00
            </Text>
            <Text style={styles.textNumero}>
              {equipeB.pontos < 10 ? `0${equipeB.pontos}` : equipeB.pontos}
            </Text>
          </TouchableOpacity>
          <Text style={styles.textSet}>00000</Text>
        </View>
      </View>
    </View>
  );
};

export default Placar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  containerPlacar: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textNome: {
    color: '#fff',
    fontFamily: 'LTBinaryNeueRound-Regular',
    fontSize: Math.round(width * 0.06),
    marginBottom: 10,
  },
  textNumero: {
    fontFamily: 'Digital Display',
    fontSize: Math.round(width * 0.35),
    color: '#fff',
    padding: 10,
    backgroundColor: '#000000c0',
  },
  textSet: {
    color: '#fff',
    fontFamily: 'LTBinaryNeueRound-Regular',
    fontSize: Math.round(width * 0.06),
  },
  textSeparador: {},
});
