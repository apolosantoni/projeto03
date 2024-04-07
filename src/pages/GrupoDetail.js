import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GrupoDetail = ({route, navigation}) => {
  const {aguardando, grupo, grupoIndex} = route.params;
  return (
    <View style={{flex: 1, backgroundColor: 'lightgoldenrodyellow'}}>
      <View
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          backgroundColor: 'mediumslateblue',
          height: 40,
          padding: 10,
          borderRadius: 20,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{color: 'white', fontWeight: '800'}}>Voltar</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 25,
          fontWeight: '500',
          color: 'black',
          marginTop: 20,
          marginBottom: 40,
          borderBottomWidth: 2,
        }}>
        Grupo {grupoIndex + 1}
      </Text>
      <View
        style={{
          width: '70%',
          alignSelf: 'center',
          flexWrap: 'wrap',
          gap: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/*console.log(grupo)*/}
        {grupo?.map((item, index) => (
          <View
            style={{
              backgroundColor: '#AD40AF',
              borderRadius: 10,
              padding: 5,
            }}
            key={index}>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}
              onPress={
                () =>
                  Alert.alert(
                    'Clicou',
                    'Index :' + index + ' Item :' + item,
                  ) /*removeNameLista(item)*/
              }>
              <Icon
                name={item.includes('*') ? 'face-woman' : 'face-man-outline'}
                size={30}
                color={'white'}
              />
              <Text style={{color: 'white'}}>{item}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          height: 50,
          paddingHorizontal: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'gray',
            borderRadius: 10,
            paddingVertical: 10,
            //opacity: Math.floor(nomes.length / 6) == 0 ? 0.3 : 1,
          }}
          disabled={false}
          onPress={() => {}}>
          <Text
            style={{
              color: 'white',
              paddingHorizontal: 5,
            }}>
            Sortear Aleatorio
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'gray',
            borderRadius: 10,
            paddingVertical: 10,
            //opacity: Math.floor(nomes.length / 6) == 0 ? 0.3 : 1,
          }}
          disabled={false}
          onPress={() => {}}>
          <Text
            style={{
              color: 'white',
              paddingHorizontal: 5,
            }}>
            Editar nome
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'gray',
            borderRadius: 10,
            paddingVertical: 10,
            //opacity: Math.floor(nomes.length / 6) == 0 ? 0.3 : 1,
          }}
          disabled={false}>
          <Text
            style={{
              color: 'white',
              paddingHorizontal: 5,
            }}>
            Excluir Grupo
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            width: '45%',
            height: 200,
            backgroundColor: 'aliceblue',
            borderColor: 'blue',
            borderWidth: 2,
            borderRadius: 20,
            padding: 10,
          }}>
          <Text>Aguardando</Text>
        </View>
        <View
          style={{
            width: '45%',
            height: 200,
            backgroundColor: 'lightcoral',
            borderColor: 'red',
            borderWidth: 2,
            borderRadius: 20,
            padding: 10,
          }}>
          <Text>Substituidos</Text>
        </View>
      </View>
    </View>
  );
};

export default GrupoDetail;

const styles = StyleSheet.create({});
