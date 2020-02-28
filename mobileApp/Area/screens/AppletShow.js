/*----Import React----*/
import React from 'react';
import {
    Text,
    View,
    FlatList,
    RefreshControl
} from 'react-native';

/*----Import Components----*/
import AppletCard from '../components/AppletCard';

/*----Import Utils----*/
import { getAccessToken } from '../utils/common';

/*----Import Services----*/
import { getApplets} from '../services/applet.js'

/*----Import Styles----*/
import { styles } from '../Style';

export default class AppletShow extends React.Component {
    static navigationOptions = {
        title: "All Applets"
    };

    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            data: []
        };
    }

    componentDidMount = () => {
        this._refreshAllApplet();
    }

    _refreshAllApplet = async () => {
        let applet = await getApplets(getAccessToken());

        this.setState({data: []})
        this.setState({data: [
            {
                "name": "Test",
                "_id": "3456788765",
                "description": "Voici la description",
                "action": {
                    "title": "Action Title",
                    "name": "GetFavVoila",
                    "params": { "title": "Voici le titre", "body": "Voici le body"}
                },
                "reaction": {
                    "title": "Reaction Title",
                    "name": "SendSms",
                    "params": {"number": "0786385086", "content": "Voici le content"}
                },
                "refresh_time": 1,
                "last_refresh": -1,
                "enable": true
            },
            {
                "name": "Pute",
                "_id": "3456788765",
                "description": "Voici la description qui est censé être très longue quand meme ça commence à devenir long la",
                "action": {
                    "title": "Action Title",
                    "name": "GetFavVoila",
                    "params": {}
                },
                "reaction": {
                    "title": "Reaction Title",
                    "name": "SendSms",
                    "params": {"number": "0786385086", "content": "Voici le content"}
                },
                "refresh_time": 1,
                "last_refresh": -1,
                "enable": false
            },
            {
                "name": "Test",
                "_id": "3456788765",
                "description": "Voici la description",
                "action": {
                    "title": "Action Title",
                    "name": "GetFavVoila",
                    "params": { "title": "Voici le titre", "body": "Voici le body"}
                },
                "reaction": {
                    "title": "Reaction Title",
                    "name": "SendSms",
                    "params": {"number": "0786385086", "content": "Voici le content"}
                },
                "refresh_time": 1,
                "last_refresh": -1,
                "enable": true
            },
        ], refreshing: false})
    }

    FlatListItemSeparator = () => (
        <View style={styles.flatListSeparator} />
    );

    RenderFlatListStickyHeader = () => {
        const { data } = this.state;
        let text = "All your applets";

        if (data.length == 0)
            text = "You don't have any applets :(";
        return (
            <View style={styles.appletFlatListHeader}>
                <Text style={styles.flatListHeaderTitle}>{text}</Text>
            </View>
        );
    }

    RenderFlatListItem = ({ item }) => (
        <AppletCard
            item={item}
            navigation={this.props.navigation}
            action="show"
            info={" - " + (item.enable ? "Enabled" : "Disabled")}
        />
    );


    render() {
        const { navigation } = this.props;
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 0.9}}>
                <FlatList
                    refreshControl={<RefreshControl
                        onRefresh={this._refreshAllApplet}
                        refreshing={this.state.refreshing}
                    />}

                    data={this.state.data}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={this.RenderFlatListItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={this.RenderFlatListStickyHeader}
                    ListFooterComponent={<View style={{margintop: 20, height: 40}} />}

                />
                </View>
                <View style={{flex: 0.1}}>
                </View>
            </View>
                );
        }
}