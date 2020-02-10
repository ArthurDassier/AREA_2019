/*----Import React----*/
import {
    StyleSheet,
    Dimensions
} from 'react-native';

/*----Import Utils----*/
import { getSizeDifferenceByPercentage } from './utils/common';

const { width: WIDTH } = Dimensions.get('window')

const MAX_WIDTH = getSizeDifferenceByPercentage(WIDTH, 0.90);

export const styles = StyleSheet.create({

//----------------------------------------------------------------------------//
//                                   Commons                                  //
//----------------------------------------------------------------------------//

    bg: {
        backgroundColor: '#fff',
        flex: 1
    },
    
    colorBlack: {
        color: 'black'
    },

    column: {
        flexDirection: 'column'
    },

    row: {
        flexDirection: 'row'
    },

//----------------------------------------------------------------------------//
//                                   Screens                                  //
//----------------------------------------------------------------------------//
    
    //----------------------------------------------------//
    //                        Home                        //
    //----------------------------------------------------//

    flatListFooter: {
        backgroundColor: '#000',
        flex: 1,
        height: 40,
        marginTop: 20,
        width: '100%'
    },

    flatListHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        width: '100%'
    },

    flatListHeaderTitle: {
        color: '#000',
        fontFamily: 'Comfortaa-Bold',
        fontSize: 32,
        lineHeight: 36,
        marginVertical: 20,
        textAlign: 'center'
    },

    flatListSeparator: {
        marginVertical: 10,
        width: '100%'
    },

    searchBarContainer: {
        borderRadius: 8,
        width: getSizeDifferenceByPercentage(WIDTH, 0.80)
    },

    searchBarContainerActive: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1
    },

    searchBarContainerInactive: {
        backgroundColor: '#EEEEEE',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },

    searchBarInputContainerActive: {
        backgroundColor: '#fff'
    },

    searchBarInputContainerInactive: {
        backgroundColor: '#EEEEEE',
    },

    //----------------------------------------------------//
    //                       Login                        //
    //----------------------------------------------------//

    backgroundContainer: {
        alignItems: 'center',
        flex: 1,
        height: null,
        justifyContent: 'center',
        width: null,
    },

    createAccountText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        textAlign: 'center',
        textDecorationLine: 'underline'
    },

    errorText: {
        color: 'rgba(255, 99, 71, 0.7)',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    hidePwdBtn: {
        position: 'absolute',
        right: 37,
        top: 8
    },

    input: {
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        borderRadius: 25,
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        height: 45,
        marginHorizontal: 25,
        paddingLeft: 45,
        width: WIDTH - 55
    },

    inputContainer: {
        marginTop: 10
    },

    inputIcon: {
        left: 37,
        position: 'absolute',
        top: 8
    },

    logo: {
        height: 120,
        width: 120
    },

    loginBtn: {
        backgroundColor: "#0B75D9",
        borderRadius: 25,
        height: 45,
        justifyContent: 'center',
        marginTop: 20,
        width: WIDTH - 55
    },

    loginText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        textAlign: 'center'
    },

    logoContainer: {
        alignItems: 'center',
        marginBottom: 50
    },

    logoText: {
        color: 'white',
        fontSize: 35,
        fontWeight: '500',
        opacity: 0.5
    },

    successText: {
        color: 'rgba(0, 255, 0, 0.7)',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    //----------------------------------------------------//
    //                      Service                       //
    //----------------------------------------------------//

    serviceConnectButton: {
        alignSelf: 'center',
        backgroundColor: "#0B75D9",
        borderRadius: 25,
        height: 50,
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 15,
        width: getSizeDifferenceByPercentage(WIDTH, 0.5)
    },

    serviceConnectText: {
        alignSelf: 'center',
        color: '#fff',
        fontFamily: 'Comfortaa-Bold',
        fontSize: 20,
        lineHeight: 22.5
    },
    
    serviceContainer: {
        flex: 1,
        width: '100%'
    },

    serviceDescriptionContainer: {
        alignSelf: 'center',
        marginBottom: 30,
        paddingHorizontal: 16,
        width: MAX_WIDTH
    },

    serviceDescriptionText: {
        fontFamily: 'Comfortaa',
        fontSize: 16,
        lineHeight: 22.5
    },

    serviceImage: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'flex-end',
        margin: 20,
        width: '100%'
    },

    serviceTitle: {
        fontFamily: 'Comfortaa-Bold',
        fontSize: 36,
        lineHeight: 40.5,
        marginBottom: 5,
        textAlign: 'center'
    },

//----------------------------------------------------------------------------//
//                                 Components                                 //
//----------------------------------------------------------------------------//

    //----------------------------------------------------//
    //                        Card                        //
    //----------------------------------------------------//
    
    cardContainer: {
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 7,
        justifyContent: 'center',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        width: MAX_WIDTH
    },

    cardImageBackground: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'flex-end',
        width: MAX_WIDTH,
        margin: 20
    },

    cardTitle: {
        fontFamily: 'Comfortaa-Bold',
        fontSize: 20,
        lineHeight: 22.5,
        marginBottom: 30,
        textAlign: 'center'
    },

    //----------------------------------------------------//
    //                       Drawer                       //
    //----------------------------------------------------//

    drawerFooter: {
        alignItems: 'center',
        bottom: 20
    },

    drawerFooterIcon: {
        fontSize: 24
    },

    drawerFooterIconContainer: {
        flexDirection: 'column',
        marginRight: 15
    },

    drawerHeader: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },

    drawerHeaderImage: {
        height: 236,
        width: 300
    }
});