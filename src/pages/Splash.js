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
  return (
    <View style={styles.container}>
      <OrientationLocker orientation="PORTRAIT" />
      <ImageBackground
        source={require('../../assets/image/halsey_sorry.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
          <Text style={styles.text}>SplashScreen</Text>
          <Text style={styles.text}>Width {Math.round(width)}</Text>
          <Text style={styles.text}>Height {Math.round(height)}</Text>
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
