import {
    StyleSheet,
    Dimensions
} from 'react-native';
const { width: WIDTH } = Dimensions.get('window')

export const styles = StyleSheet.create({

    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center'
    },

    logoContainer: {
        alignItems: 'center',
        marginBottom: 50
    },

    logo: {
        width: 120,
        height: 120,
    },

    logoText: {
        color: 'white',
        fontSize: 35,
        fontWeight: '500',
        opacity: 0.5
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25
    },

    inputContainer: {
        marginTop: 10
    },

    inputIcon: {
        position: 'absolute',
        top: 8,
        left: 37
    },

    hidePwdBtn: {
        position: 'absolute',
        top: 8,
        right: 37
    },
    
    loginBtn: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: "#0B75D9",
        justifyContent: 'center',
        marginTop: 20
    },

    loginText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        textAlign: 'center',
    },

    errorText: {
        color: 'rgba(255, 99, 71, 0.7)',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    createAccountText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        textAlign: 'center',
        textDecorationLine: 'underline'
    }
});