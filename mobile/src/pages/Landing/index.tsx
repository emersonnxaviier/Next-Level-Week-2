import React, { useEffect, useState } from 'react';

import {
    View,
    Text,
    Image,
    Alert,

} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

import styles from './styles';

import landingImg from '../../assets/images/landing.png'
import studyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png'

const Landing = () => {

    const navigation = useNavigation();

    const [totalConnections, setTotalConnections] = useState();

    useEffect(() => {

        try {
            api.get('connections').then(Response => {
                const { total } = Response.data;
                setTotalConnections(total);
            });

        } catch (error) {
            Alert.alert('Erro: ' + error);
        }

    }, []);

    function handleNavigationGiveClassesPage() {
        navigation.navigate('GiveClasses');
    }

    function handleNavigationToStudyPages() {
        navigation.navigate('StudyTabs');
    }

    return (
        <View style={styles.container} >
            <Image source={landingImg} style={styles.banner} />

            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>
                    O que deseja fazer ?
                </Text>
            </Text>

            <View style={styles.buttonContainer}>
                <RectButton
                    style={[styles.button, styles.buttonPrimary]}
                    onPress={handleNavigationToStudyPages}
                >
                    <Image source={studyIcon} />
                    <Text style={styles.buttonText}> Estudar </Text>
                </RectButton>

                <RectButton
                    style={[styles.button, styles.buttonSecondary]}
                    onPress={handleNavigationGiveClassesPage}
                >
                    <Image source={giveClassesIcon} />
                    <Text style={styles.buttonText}> Dar aulas </Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de {totalConnections} {totalConnections !== 1 ? 'conexões' : 'conexão'} já realizada{totalConnections !== 1 ? 's' : null} {' '}
                <Image source={heartIcon} />
            </Text>

        </View>
    );
}

export default Landing;