import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Alert,

} from 'react-native';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { useFocusEffect } from '@react-navigation/native';

import styles from './styles';

const Favorites = () => {

    const [favorites, setFavorites] = useState([]);

    // vai executar toda vez em que a tela entrar em foco(ser exibida).
    useFocusEffect(() => {
        loadFavorites();
    });


    function loadFavorites() {
        try {
            AsyncStorage.getItem('favorites').then(response => {
                if (response) {
                    const favoritedTeachers = JSON.parse(response);
                    setFavorites(favoritedTeachers);
                }
            });
        } catch (error) {
            Alert.alert('Erro: ' + error);
        }
    }


    return (
        <View style={styles.constainer} >
            <PageHeader title='Meus proffs favoritos' />

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {
                    favorites.map((teacher: Teacher) => {
                        return (
                            <TeacherItem
                                key={teacher.id}
                                teacher={teacher}
                                favorited
                            />
                        );
                    })
                }
            </ScrollView>

        </View>
    );
}

export default Favorites;
