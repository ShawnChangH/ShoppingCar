
import React ,{useState}from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "./src/screen/Login";
import Singin from "./src/screen/Singin";
import Tab01 from "./src/screen/Tab01";
import Tab02 from "./src/screen/Tab02";
import Detail from "./src/screen/Detail";
//import store from './src/redux/store/store';
import store from './src/redux/store/index';
import { ToastProvider } from 'react-native-toast-notifications'
import { PersistGate } from "redux-persist/lib/integration/react";
import { getPersistor } from "@rematch/persist";
//Provider將APP包住才能在裡面傳值
import { Provider } from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const persistor = getPersistor();

export default function App () {


   
    function TabHome() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Tab01" component={Tab01} />   
                <Tab.Screen name="Tab02" component={Tab02} />
            </Tab.Navigator>
        );
    }

    return (
      
            <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ToastProvider offsetTop={500}>
                    <NavigationContainer>
                        <Stack.Navigator>             
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen name="Singin" component={Singin} />
                            <Stack.Screen name="TabHome" component={TabHome} />
                            <Stack.Screen name="Detail" component={Detail} />
                         </Stack.Navigator>   
                    </NavigationContainer>
                </ToastProvider>
                </PersistGate>
            </Provider>
            
        
  );
};
