import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Alert,

} from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'; //BorderlessButton é um botao que não é retangular, e que não possui fundo.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';

const TeacherList = () => {

    const [isFiltersVisible, setIsFiltersViseble] = useState(false);

    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    // vai executar toda vez em que a tela entrar em foco(ser exibida).
    useFocusEffect(() => {
        loadFavorites();
    })


    function loadFavorites() {
        try {
            AsyncStorage.getItem('favorites').then(response => {
                if (response) {
                    const favoritedTeachers = JSON.parse(response);
                    const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                        return teacher.id;
                    })
                    setFavorites(favoritedTeachersIds);
                }
            });
        } catch (error) {
            Alert.alert('Erro: ' + error);
        }
    }

    // função para mostrar e esconder os filtros.
    function handleToggleFiltersVisible() {
        setIsFiltersViseble(!isFiltersVisible);
    }

    async function handleFiltersSubmit() {

        try {

            loadFavorites();

            const response = await api.get('classes', {
                params: {
                    subject,
                    week_day,
                    time,
                }
            });

            setIsFiltersViseble(false);
            setTeachers(response.data);

        } catch (error) {
            Alert.alert('Erro: ' + error);
        }

    }


    return (
        <View style={styles.constainer} >

            <PageHeader
                title='Proffs disponíveis'
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name='filter' size={20} color='#FFF' />
                    </BorderlessButton>
                )}

            >

                {isFiltersVisible && (

                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Qual a matéria?'
                            placeholderTextColor='#c1bccc'
                            value={subject}
                            onChangeText={text => setSubject(text)}
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Qual o dia?'
                                    placeholderTextColor='#c1bccc'
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Qual horário?'
                                    placeholderTextColor='#c1bccc'
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                />
                            </View>

                        </View>

                        <RectButton
                            style={styles.submitButton}
                            onPress={handleFiltersSubmit}
                        >
                            <Text style={styles.submitButtonText}> Filtrar </Text>
                        </RectButton>

                    </View>
                )}

            </PageHeader>


            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    );
                })}


            </ScrollView>

        </View>
    );
}

export default TeacherList;
