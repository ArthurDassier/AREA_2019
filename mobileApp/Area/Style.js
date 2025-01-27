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
    //                       Applet                       //
    //----------------------------------------------------//

    appletFlatListHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },

    //----------------------------------------------------//
    //                Applet Description                  //
    //----------------------------------------------------//

    appletDescriptionContainer: {
        
    },

    descriptionContainer: {
        padding: 10,
        justifyContent: 'center',
    },

    buttonContainer: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    appletBtn: {
        backgroundColor: '#0B75D9',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 25,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 12,
        textAlign: 'center',
        justifyContent: 'center',
        shadowRadius: 10,
        shadowColor: 'black',
        width: WIDTH - 210,
        height: 50,

    },

    appletTitle: {
        fontSize: 25,
        fontFamily: 'Comfortaa-Bold',
    },

    appletName: {
        fontSize: 20,
        fontFamily: 'Comfortaa',
    },

    appletSubTitle: {
        fontSize: 18,
        fontFamily: 'Comfortaa',
        marginLeft: 12
    },

    appletOptions: {
        fontSize: 14,
        fontFamily: 'Comfortaa',
        marginLeft: 12,
        textAlign: 'left',
        marginLeft: 20
    },

    //----------------------------------------------------//
    //                    Applet Form        ...          //
    //----------------------------------------------------//

    appletFormContainer: {
        flex: 1,
    },

    appletFormTitle: {
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 10
    },

    appletFormName: {
        fontSize: 25,
        fontFamily: 'Comfortaa-Bold',
        textAlign: 'center'
    },

    dataForm: {
        fontSize: 14,
        fontFamily: 'Comfortaa',
        textAlign: 'center',
        padding: 5,
        marginBottom: 5
    },
    data: {
        fontSize: 15,
        fontFamily: 'Comfortaa-Light',
        textAlign: 'center'
    },

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

    flatListFooterEmpty: {
        backgroundColor: '#EEEEEE',
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

    inputDescription: {
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        borderRadius: 25,
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        height: 150,
        marginHorizontal: 25,
        paddingLeft: 45,
        width: WIDTH - 55
    },

    //----------------------------------------------------//
    //                      Profil                        //
    //----------------------------------------------------//

    optionContainer: {
        flex: 1
    },

    profilContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginBottom: 30
    },

    profilPic: {
        paddingTop: 10
    },

    profilUsername: {
        paddingTop: 10
    },

    username: {
        fontFamily: 'Comfortaa-Bold',
        fontSize: 20,
        lineHeight: 22.5,
        textAlign: 'center',
        marginLeft: 10
    },

    profilOption: {
        fontFamily: 'Comfortaa-Light',
        fontSize: 15,
        lineHeight: 11.25,
        marginLeft: 15,
        marginBottom: 5,
        paddingTop: 10
    },

    avatarEdit: {
        fontFamily: 'Comfortaa-Bold',
        textAlign: 'center',
        color: 'blue',
        lineHeight: 25,
        textDecorationLine: 'underline'
    },

    profilEdit: {
        fontFamily: 'Comfortaa-Bold',
        position: 'absolute',
        right: MAX_WIDTH - (MAX_WIDTH - 10),
        color: 'blue',
        lineHeight: 25,
        textDecorationLine: 'underline'
    },

    profilInfo: {
        fontFamily: 'Comfortaa-Bold',
        fontSize: 15,
        marginLeft: 25,
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
    //                     AppletCard                     //
    //----------------------------------------------------//

    appletCardContainer: {
        margin: 20
    },

    appletCardTitle: {
        color: "#0B75D9",
        fontFamily: 'Comfortaa-Bold',
        fontSize: 20,
        lineHeight: 22.5,
        marginBottom: 5,
        // textAlign: 'left'
    },
    
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
        textAlign: 'center',
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
