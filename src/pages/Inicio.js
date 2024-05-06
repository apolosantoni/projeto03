import React, {useEffect} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {OrientationLocker} from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Inicio = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <OrientationLocker orientation="PORTRAIT" />
      <ImageBackground
        source={require('../../assets/image/bg_oxosseEsportes.png')}
        resizeMode="contain"
        style={styles.image}>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Grupo')}>
            <View style={styles.menuButton}>
              <Icon name="account-group" size={120} color="white" />
              <Text style={styles.menuButtonText}>Sortear Grupo</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Placar')}>
            <View style={styles.menuButton}>
              <Icon name="volleyball" size={120} color="white" />
              <Text style={styles.menuButtonText}>Placar Volei</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Alert.alert('Sistema', 'Não desenvolvido')}>
            <View style={styles.menuButton}>
              <Icon name="soccer-field" size={120} color="white" />
              <Text style={styles.menuButtonText}>Placar Futebol</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Alert.alert('Sistema', 'Não desenvolvido')}>
            <View style={styles.menuButton}>
              <Icon name="basketball-hoop-outline" size={120} color="white" />
              <Text style={styles.menuButtonText}>Placar Basquete</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={true}
            onPress={() => navigation.navigate('NewGrupo')}>
            <View style={styles.menuButton}>
              <Icon name="account-group" size={120} color="white" />
              <Text style={styles.menuButtonText}>Novo Grupo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={false}
            onPress={() => navigation.navigate('Timer')}>
            <View style={styles.menuButton}>
              <Icon name="account-group" size={120} color="white" />
              <Text style={styles.menuButtonText}>Timer</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Inicio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  menuContainer: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  menuButton: {
    flexDirection: 'column',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000c0',
  },
  menuButtonIcon: {},
  menuButtonText: {
    width: 150,
    color: 'white',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
