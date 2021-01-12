import React from 'react';
import {
    View,
    Text,
    ImageBackground, // para colocar uma imagem de fundo.

} from 'react-native';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';


import giveClassesBgImage from '../../assets/images/give-classes-background.png';
import { useNavigation } from '@react-navigation/native';

const GiveClasses = () => {

    const navigation = useNavigation();

    function handleNavigationBack() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={giveClassesBgImage}
                style={styles.content}
                resizeMode='contain'
            >

                <Text style={styles.title}> Quer ser um proff? </Text>
                <Text style={styles.description}> Para começar, você se cadastra como professor na nossa prataforma web.</Text>

            </ImageBackground>

            <RectButton style={styles.okButton} onPress={handleNavigationBack}>
                <Text style={styles.okButtonText}>Tudo bem</Text>
            </RectButton>


        </View>
    );
}

export default GiveClasses;