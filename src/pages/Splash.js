import React, {useEffect} from 'react';
import {
  Button,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {OrientationLocker} from 'react-native-orientation-locker';

const Splash = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  useEffect(() => {
    const timer = setTimeout(() => {
      // Trocar para a próxima tela após 5 segundos
      navigation.replace('Inicio'); // Substitui a tela atual pela próxima
    }, 5000); // 5000 milissegundos = 5 segundos

    // Limpando o timer ao desmontar o componente para evitar vazamentos de memória
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <OrientationLocker orientation="PORTRAIT" />
      <ImageBackground
        source={require('../../assets/image/bg_oxosseEsportes.png')}
        resizeMode="cover"
        style={styles.image}>
        <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
          {/* <Text style={styles.text}>SplashScreen</Text>
          <Text style={styles.text}>Width {Math.round(width)}</Text>
          <Text style={styles.text}>Height {Math.round(height)}</Text> */}
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Splash;

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
  },
});
