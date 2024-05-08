import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Inicio from '../pages/Inicio';
import Grupo from '../pages/Grupo';
import GrupoDetail from '../pages/GrupoDetail';

import MyContextProvider from '../context/MyContextProvider';
import Splash from '../pages/Splash';
import Placar from '../pages/Placar';
import NewGrupo from '../pages/NewGrupo';
import Timer from '../pages/Timer';

const NativeStack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <MyContextProvider>
      <NativeStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Splash">
        <NativeStack.Group>
          <NativeStack.Screen name="Splash" component={Splash} />
          <NativeStack.Screen name="Inicio" component={Inicio} />
          <NativeStack.Screen name="Grupo" component={Grupo} />
          <NativeStack.Screen name="Placar" component={Placar} />
          <NativeStack.Screen name="NewGrupo" component={NewGrupo} />
          <NativeStack.Screen name="Timer" component={Timer} />
        </NativeStack.Group>
        <NativeStack.Group screenOptions={{presentation: 'modal'}}>
          <NativeStack.Screen name="GrupoDetail" component={GrupoDetail} />
        </NativeStack.Group>
      </NativeStack.Navigator>
    </MyContextProvider>
  );
};

export default MainStack;
