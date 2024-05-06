import {
  Button,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {OrientationLocker} from 'react-native-orientation-locker';

import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';

//import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';

const {width, height} = Dimensions.get('window');

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
  Partidas: {
    1: {
      historico: [],
      rotacaoA: [],
      rotacaoB: [],
    },
  },
};

const Placar = ({navigation}) => {
  const [config, setConfig] = useState(dados.Config);
  const [equipeA, setEquipeA] = useState(dados.EquipeA);
  const [equipeB, setEquipeB] = useState(dados.EquipeB);
  const [vantagem, setVantagem] = useState('');
  const [historico, setHistorico] = useState([]);
  const [partidas, setPartidas] = useState('A-B-A-B-X');

  const [isModalVisible, setModalVisible] = useState(false);
  const [historicoVisible, setHistoricoVisible] = useState(false);
  const [partidasVisible, setPartidasVisible] = useState(false);
  const scrollViewRef = useRef();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const atualizarPontosPlus = tipo => {
    if (tipo === 'A') {
      if (
        equipeA.pontos <= config.pontosSet &&
        equipeA.pontos <= equipeB.pontos + config.diferencaVitoria
      ) {
        setEquipeA(prevState => ({
          ...prevState,
          pontos: prevState.pontos + 1,
        }));
        setVantagem('A');
        historico.push('A');
      }
    } else {
      if (
        equipeB.pontos <= config.pontosSet &&
        equipeB.pontos <= equipeA.pontos + config.diferencaVitoria
      ) {
        setEquipeB(prevState => ({
          ...prevState,
          pontos: prevState.pontos + 1,
        }));
        setVantagem('B');
        historico.push('B');
      }
    }
  };

  const atualizarPontosMinus = tipo => {
    let indice = historico.lastIndexOf(tipo);
    const novosDados = [...historico];

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
    novosDados.splice(indice, 1);
    setHistorico(novosDados);
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
    setHistorico([]);
  };

  useEffect(() => {}, [width, height, OrientationLocker]);

  const Display = ({
    letra,
    equipeNome,
    equipePonto,
    equipeSet,
    onPress,
    onLongPress,
  }) => {
    return (
      <View style={styles.containerPlacar}>
        <TouchableOpacity>
          <Text style={styles.textNome}>{equipeNome}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            vantagem == letra
              ? {borderBottomWidth: 10, borderBottomColor: 'red'}
              : {borderBottomWidth: 10, borderBottomColor: 'black'}
          }
          onPress={onPress}
          onLongPress={onLongPress}>
          <Text
            style={[
              styles.textNumero,
              {position: 'absolute', zIndex: 0, color: '#555'},
            ]}>
            00
          </Text>
          <Text style={[styles.textNumero, {zIndex: 1}]}>
            {equipePonto < 10 ? `0${equipePonto}` : equipePonto}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.textSet, {display: 'none'}]}>{equipeSet}</Text>
      </View>
    );
  };

  const ModalMenu = () => {
    return (
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            paddingHorizontal: 50,
          }}>
          <View style={{backgroundColor: 'white'}}>
            <View
              style={{
                backgroundColor: 'dimgray',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
                <Icon name="home" size={32} color="dodgerblue" />
              </TouchableOpacity>
              <Text>Menu Opções</Text>
              <TouchableOpacity onPress={toggleModal}>
                <IconMaterial
                  name="close-circle-outline"
                  size={32}
                  color="dodgerblue"
                />
              </TouchableOpacity>
            </View>

            <View style={{width: '100%', marginTop: 10, paddingHorizontal: 10}}>
              <ScrollView style={{minHeight: 200}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      width: '50%',
                      flexDirection: 'column',
                      paddingRight: 10,
                    }}>
                    <Text>Modo de jogo:</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text>1 Set</Text>
                      <Switch
                        value={partidasVisible}
                        onValueChange={e => setPartidasVisible(e)}
                      />
                      <Text>3 Sets</Text>
                    </View>

                    <Text>Pontos por partida : {config.pontosSet}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{paddingRight: 20}}>10</Text>
                      <Slider
                        style={{width: 150}}
                        step={5}
                        minimumValue={10}
                        maximumValue={25}
                        value={config.pontosSet}
                        onValueChange={e =>
                          setConfig(prevState => ({
                            ...prevState,
                            pontosSet: e,
                          }))
                        }
                      />
                      <Text>25</Text>
                    </View>

                    <View style={styles.menuOptionTextLine}>
                      <Text>Historico pontos:</Text>
                      <View style={styles.menuOptionSwift}>
                        <Text>Off</Text>
                        <Switch
                          value={historicoVisible}
                          onValueChange={e => setHistoricoVisible(e)}
                        />
                        <Text>On</Text>
                      </View>
                    </View>

                    <View style={styles.menuOptionTextLine}>
                      <Text>Rotacao:</Text>
                      <View style={styles.menuOptionSwift}>
                        <Text>Off</Text>
                        <Switch value={false} />
                        <Text>On</Text>
                      </View>
                    </View>

                    <View style={styles.menuOptionTextLine}>
                      <Text>Notificação Vitoria:</Text>
                      <View style={styles.menuOptionSwift}>
                        <Text>Off</Text>
                        <Switch value={false} />
                        <Text>On</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.menuCollum}>
                    <View style={{rowGap: 20}}>
                      <Button title="Reiniciar partida" onPress={reset} />
                      <Button
                        title="Reiniciar Jogo"
                        disabled={true}
                        onPress={() => {}}
                      />
                      <Button
                        title="Configuracao Padrao"
                        disabled={true}
                        onPress={() => {}}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const ModalVitoria = () => {
    return (
      <Modal>
        <View>
          <View>
            <Text> Vitória</Text>
          </View>
          <View>
            <Text> Equipe </Text>
          </View>
          <View>
            <Text> Reiniciar </Text>
          </View>
          <View>
            <Text> Proximo Set </Text>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <OrientationLocker orientation="LANDSCAPE_LEFT" />
      <View
        style={{
          position: 'absolute',
          top: 5,
          lineHeight: 50,
          paddingHorizontal: 10,
          backgroundColor: '#c9c9c9c0',
          color: 'white',
          display: 'none',
        }}>
        <Text>
          Placar: Width = {Math.round(width)} Height = {Math.round(height)}
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 5,
          lineHeight: 50,
          paddingHorizontal: 10,
          backgroundColor: '#c9c9c9c0',
          color: 'white',
          display: partidasVisible ? 'flex' : 'none',
        }}>
        <Text style={{fontSize: 30}}>{partidas}</Text>
      </View>

      <View
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Display
          letra={'A'}
          equipeNome={equipeA.nome}
          equipePonto={equipeA.pontos}
          equipeSet={partidas}
          onPress={() => atualizarPontosPlus('A')}
          onLongPress={() => atualizarPontosMinus('A')}
        />
        <View style={styles.containerSeparador}>
          <View
            style={{
              backgroundColor: 'black',
              top: 50,
              position: 'absolute',
              width: '100%',
            }}>
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({animated: true})
              }
              style={{
                height: height - 120,
                marginBottom: 220,
                display: historicoVisible ? 'flex' : 'none',
              }}>
              {historico &&
                historico?.map &&
                historico.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        paddingHorizontal: 5,
                        color: 'red',
                      }}>
                      {index + 1 < 10 ? '0' + (index + 1) : index + 1}
                    </Text>
                    <Text
                      style={{
                        fontSize: 30,
                        paddingHorizontal: 5,
                        color: 'white',
                      }}>
                      {item}
                    </Text>
                  </View>
                ))}
            </ScrollView>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'dodgerblue',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              display: isModalVisible ? 'none' : 'flex',
            }}
            onPress={toggleModal}>
            <Text styles={{color: 'white'}}>Menu</Text>
          </TouchableOpacity>
        </View>
        <Display
          letra={'B'}
          equipeNome={equipeB.nome}
          equipePonto={equipeB.pontos}
          equipeSet={partidas}
          onPress={() => atualizarPontosPlus('B')}
          onLongPress={() => atualizarPontosMinus('B')}
        />
      </View>
      <ModalMenu />
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
  containerSeparador: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: 200,
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
    fontSize: width ? Math.round(width * 0.06) : 50,
    marginBottom: 10,
  },
  textNumero: {
    fontFamily: 'Digital Display',
    fontSize: width ? Math.round(width * 0.06) : 240,
    color: '#fff',
    padding: 10,
    backgroundColor: '#000000c0',
  },
  textSet: {
    color: '#fff',
    fontFamily: 'LTBinaryNeueRound-Regular',
    fontSize: width ? Math.round(width * 0.06) : 50,
  },
  textSeparador: {},
  menuModal: {},
  menuContainer: {},
  menuHeader: {},
  menuCollum: {width: '50%'},
  menuOptionHeader: {},
  menuOptionTextLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuOptionSwift: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuOptionSlide: {},
});
