import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({

    container: {
        backgroundColor: '#8257e5',
        flex: 1,
        justifyContent: 'center',
        padding: 40,
    },
    banner: {
        width: '100%',
        resizeMode: 'contain', //serve para redmencionar a imagem proporcionalmente a largura ou a altura porem a imagem e todo conteudo dela deve estar visível. 
    },
    title: {
        color: '#FFF',
        fontSize: 20,
        lineHeight: 30,
        marginTop: 80,
        fontFamily: 'Poppins_400Regular'
    },
    titleBold: {
        fontFamily: 'Poppins_600SemiBold'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-between'
    },
    button: {
        height: 150,
        width: '48%',
        borderRadius: 8,
        padding: 24,
        justifyContent: 'space-between'
    },
    buttonPrimary: {
        backgroundColor: '#9871f5'
    },
    buttonText: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 20
    },
    buttonSecondary: {
        backgroundColor: '#04d361'
    },
    totalConnections: {
        fontFamily: 'Poppins_400Regular',
        color: '#d4c2ff',
        lineHeight: 20,
        fontSize: 12,
        maxHeight: 140,
        marginTop: 40

    },

});


export default styles;