import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppLoading from 'expo-app-loading';

import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo'; // o useFonts importa em apenas um e em qualquer um dos dois.
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import AppStack from './src/routes/AppStack';


export default function App() {

  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  // enquanto as fonts nao forem carregadas mostre o loading.
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  else {
    return (
      <>
        <AppStack />
        <StatusBar style="light" translucent />
      </>
    );
  }
}


