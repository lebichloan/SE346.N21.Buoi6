import Classes from "../screens/Classes";
import Details from "../screens/Detail";
import Login from "../screens/Login";
import Register from "../screens/Register";
import {NavigationContainer} from '@react-navigation/native'; 
import {createNativeStackNavigator} from '@react-navigation/native-stack'; 

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Register"
      screenOptions={{headerShown: false}}>
        <Stack.Screen name="Register" component={Register}></Stack.Screen>
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
        <Stack.Screen name="Classes" component={Classes}></Stack.Screen>
        <Stack.Screen name="Details" component={Details}></Stack.Screen>
    </Stack.Navigator>
  );
}

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default MainNavigator;

