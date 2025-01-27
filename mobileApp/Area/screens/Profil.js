/*----Import React----*/
import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    FlatList,
    RefreshControl,
    Alert
} from 'react-native';

import { Avatar } from 'react-native-elements';

/*----Import Services----*/
import { getUserInfo, getUserServices } from '../services/user';
import { getServicesList, disconnectService} from '../services/services';

/*----Import Utils----*/
import { getAccessToken } from '../utils/common';

/*----Import Styles----*/
import { styles } from '../Style';


export default class Profil extends React.Component {


    constructor() {
        super()
        this.state = {
            refreshing: false,
            username: 'Bob le Bricoleur',
            email: 'BobLeBircoleur@tfou.com',
            avatar: 'https://m.media-amazon.com/images/M/MV5BNjRlYjgwMWMtNDFmMy00OWQ0LWFhMTMtNWE3MTU4ZjQ3MjgyXkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_CR0,45,480,270_AL_UX477_CR0,0,477,268_AL_.jpg',
            services: [""]
        }
    }

    componentDidMount = () => {
        this._refreshProfil();
    }

    _checkDisco = (data) => {
        if (data.status == "success") {
            Alert.alert(
                'Success',
                 data.message,
                [
                  { text: 'Perfect', style: 'cancel' },
                ]);
        } else {
            Alert.alert(
                "Problem...",
                 data.message,
                [
                  { text: 'Aie...', style: 'cancel' },
                ]);
        }
    }

    _disconnect = async (name) => {
        await disconnectService(name, getAccessToken()).then((response) => this._checkDisco(response));
    } 

    headerContainer = () => {
        return (
            <View style={styles.profilContainer}>
                <View style={styles.profilPic}>
                    <Avatar
                        size='xlarge'
                        title='Profile picture'
                        rounded
                        source={{
                            uri:
                                'https://m.media-amazon.com/images/M/MV5BNjRlYjgwMWMtNDFmMy00OWQ0LWFhMTMtNWE3MTU4ZjQ3MjgyXkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_CR0,45,480,270_AL_UX477_CR0,0,477,268_AL_.jpg',
                        }}
                        showEditButton
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                    />
                </View>
                <View style={styles.profilUsername}>
                    <Text style={styles.username}>
                        {this.state.username}
                    </Text>
                    <Text style={styles.avatarEdit}
                        onPress={() => console.log("Works!")}
                    >
                        Edit
                    </Text>
                </View>
            </View>
        );
    }

    emailContainer = () => {
        return (
            <View>
                <Text style={styles.profilOption}>
                    Email:
                </Text>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <Text style={styles.profilInfo}>
                        {this.state.email}
                </Text>
                    <Text style={styles.profilEdit}
                        onPress={() => console.log("Works!")}>
                        Edit
                </Text>
                </View>
            </View>
        );
    }

    passwordContainer = () => {
        return (
            <View>
                <Text style={styles.profilOption}>
                    Password:
                </Text>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <TextInput style={styles.profilInfo} secureTextEntry={true} editable={false}>
                        MonMotDePasse
                </TextInput>
                    <Text style={styles.profilEdit}
                        onPress={() => console.log("Works!")}>
                        Edit
                </Text>
                </View>
            </View>
        );
    }

    servicesContainer = () => {
        return (
            <View>
                <Text style={styles.profilOption}>
                    Services:
                </Text>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <FlatList
                        data={this.state.services}
                        renderItem={
                            ({ item }) =>
                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                    <Text style={styles.profilInfo}>
                                        {item}
                                    </Text>
                                    <Text style={styles.profilEdit}
                                        onPress={() => {
                                                    Alert.alert(
                                                      'Confirmation',
                                                      'Disconnect from ' + item + ' ?',
                                                      [
                                                        { text: 'Yes', onPress: () => this._disconnect(item)},
                                                        { text: 'No', style: 'cancel' },
                                                      ]);
                                        }}>
                                        Disconnecting
                                    </Text>
                                </View>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

            </View>
        );
    }

    _refreshProfil = async () => {
        let info = await getUserInfo(getAccessToken());
        let services = await getUserServices(getAccessToken());

        this.setState({refreshing: false, username: info['username'], email: info['mail'], services: []});

        Object.entries(services).forEach(([key, value]) => {
            if (value == true) {
               this.setState({
                   services: [...this.state.services, key]
               });
            }
        });
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView
                    refreshControl={<RefreshControl
                        onRefresh={this._refreshProfil}
                        refreshing={this.state.refreshing}
                    />}
                >
                    {this.headerContainer()}
                    <View style={styles.optionContainer}>
                        {this.emailContainer()}
                        {this.passwordContainer()}
                        {this.servicesContainer()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}