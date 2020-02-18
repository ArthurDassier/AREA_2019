/*----Import React----*/
import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    FlatList,
    RefreshControl
} from 'react-native';

import { Avatar } from 'react-native-elements';


/*----Import Styles----*/
import { styles } from '../Style';


export default class Profil extends React.Component {


    constructor() {
        super()
        this.state = {
            refreshing: false,
        }
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
                        Bob le Bricoleur
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
                        BobLeBircoleur@tfou.com
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
        const services = [
            { service: "Google" },
            { service: "Spotify" },
            { service: "Github" },
            { service: "Youtube" },
            { service: "PushBullet" },
            { service: "Drive" },
        ]
        return (
            <View>
                <Text style={styles.profilOption}>
                    Services:
                </Text>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <FlatList
                        data={services}
                        renderItem={
                            ({ item }) =>
                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                    <Text style={styles.profilInfo}>
                                        {item.service}
                                    </Text>
                                    <Text style={styles.profilEdit}
                                        onPress={() => console.log("Disconnecting from " + item.service)}>
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
        wait(2000).then(() => this.setState({refreshing: false}))
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