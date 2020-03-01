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

/*----Import Utils----*/
import { getAccessToken } from '../utils/common';

/*----Import Services--*/
import { getUsers, getUserInfo, delUser } from '../services/user'

/*----Import Styles----*/
import { styles } from '../Style';


export default class Profil extends React.Component {


    constructor() {
        super()
        this.state = {
            refreshing: false,
            username: "",
            users: []
        }
    }

    componentDidMount = () => {
        this._refreshUserList();
        console.log(this.state.users);
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

    deletUser = async (name) => {
        await delUser(getAccessToken(), name.id).then((response) => this._checkDisco(response));
    } 

    userContainer = () => {
        return (
            <View>
                <Text style={styles.profilOption}>
                    Users:
                </Text>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <FlatList
                        data={this.state.users}
                        renderItem={
                            ({ item }) =>
                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                    <Text style={styles.profilInfo}>
                                        {item.username}
                                    </Text>
                                    <Text style={styles.profilEdit}
                                        onPress={() => {
                                            if (item.username == this.state.username) {
                                                    Alert.alert(
                                                      'Nope.',
                                                      'You can\'t destroy yourself man',
                                                      [
                                                        { text: 'Gneee', style: 'cancel' },
                                                      ]);
                                            } else {
                                                    Alert.alert(
                                                      'Confirmation',
                                                      'DO YOU WANT TO DESTROY THIS HUMAN: ' + item.username + ' ?',
                                                      [
                                                        { text: 'DESTROYYY', onPress: () => this.deletUser(item)},
                                                        { text: 'Keep him alive', style: 'cancel' },
                                                      ]);
                                            }
                                        }}>
                                        DESTROY HIM
                                    </Text>
                                </View>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

            </View>
        );
    }

    _refreshUserList = async () => {
        let info = await getUserInfo(getAccessToken());
        this.setState({username: info['username']});
        if (info['username'] != "admin") {
            Alert.alert('Who the hell are you ?', 'You\'re not allowed to be here :(',
                [{ text: 'Yes sir, i leave this VIP place...'}]);
            this.props.navigation.navigate('Discover');
        }
        let listUser = await getUsers(getAccessToken());

        this.setState({refreshing: false, users: listUser.datas});

        Object.entries(info).forEach(([key, value]) => {
        });
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView
                    refreshControl={<RefreshControl
                        onRefresh={this._refreshUserList}
                        refreshing={this.state.refreshing}
                    />}
                >
                    <View style={styles.optionContainer}>
                        {this.userContainer()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}