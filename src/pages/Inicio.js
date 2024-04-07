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

const Inicio = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <OrientationLocker orientation="PORTRAIT" />
      <ImageBackground
        source={require('../../assets/image/halsey_sorry.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <Text style={styles.text}>Menu</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Grupo')}>
          <Text style={styles.text}>Sortear Grupo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Placar')}>
          <Text style={styles.text}>Placar Volei</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Alert.alert('Sistema', 'Não desenvolvido')}>
          <Text style={styles.text}>Placar Futebol</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Alert.alert('Sistema', 'Não desenvolvido')}>
          <Text style={styles.text}>Placar Basquete</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Inicio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
    marginBottom: 20,
  },
});
