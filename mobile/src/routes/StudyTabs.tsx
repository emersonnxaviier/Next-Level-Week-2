import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

const StudyTabs = () => {

    return (
        <Navigator
            tabBarOptions={{
                style: {
                    elevation: 0, // propriedade de sombra no android
                    shadowOpacity: 0, // propriedade de sombra no ios
                    height: 64,
                },
                // estilização de cada uma das abas
                tabStyle: {
                    flexDirection: 'row', // para ficar o icone e o texto um do lado do outro.
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                // estilização dos icones
                iconStyle: {
                    flex: 0,
                    width: 20,
                    height: 20,
                },
                // estilização dos textos dentro das abas
                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16
                },
                inactiveBackgroundColor: '#fafafc', // cor de fundo da aba quando ela não estiver selecionada
                activeBackgroundColor: '#ebebf5',  // cor de fundo da aba quando ela estiver selecionada
                inactiveTintColor: '#c1bccc',  // cor do texto quando a aba não esta selecionada
                activeTintColor: '#32264d', // cor do texto quando a aba estiver selecionada

            }}
        >
            <Screen
                name='TeacherList'
                component={TeacherList}
                options={{
                    tabBarLabel: 'Proffs', // texto que vai aparecer dentro da aba.
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons name='ios-easel' size={size} color={focused ? '#8357e5' : color} />
                        );
                    }
                }}
            />
            <Screen
                name='Favorites'
                component={Favorites}
                options={{
                    tabBarLabel: 'Favoritos',
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons name='ios-heart' size={size} color={focused ? '#8357e5' : color} />
                        );
                    }
                }}
            />
        </Navigator>
    );

}

export default StudyTabs;