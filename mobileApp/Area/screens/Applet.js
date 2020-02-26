/*----Import React----*/
import React from 'react';
import {
    Text,
    View,
    FlatList
} from 'react-native';

/*----Import Components----*/
import AppletCard from '../components/AppletCard';

/*----Import Services---*/
import { getActionList, getReactionList } from '../services/services'
import { getUserInfo, getUserServices } from '../services/user';

/*----Import Utils----*/
import { getAccessToken } from '../utils/common';

/*----Import Styles----*/
import { styles } from '../Style';

export default class Applet extends React.Component {
    static navigationOptions = {
        title: "Applet"
    };

    constructor(props) {
        super(props);

        this.state = {
            action: [],
            reaction: [],
            services: [],
            finalAction: {},
            finalReaction: {}
        };
        this._actuAction = this._actuAction.bind(this);
    }

    componentDidMount = () => {
        this._refreshAction();
        this._refreshServices();
    }

    _refreshAction = async () => {
        const { navigation } = this.props;
        let allActions = await getActionList();

        Object.entries(allActions).forEach(([key, value]) => {
            if (value.service == navigation.getParam('item').id) {
                value = {
                    ...value,
                    ["id"]: key
                }
               this.setState({
                   action: [...this.state.action, value]
               });
            }
        });
    }

    _refreshReaction = async () => {
        let allActions = await getReactionList();

        Object.entries(allActions).forEach(([key, value]) => {
            if (this.state.services.find(element => element == value.service)) {
                value = {
                    ...value,
                    ["id"]: key
                }
                this.setState({
                    reaction: [...this.state.reaction, value]
                });
            }
        });
    }

    _refreshServices = async () => {
        let info = await getUserInfo(getAccessToken());
        let services = await getUserServices(getAccessToken());

        Object.entries(services).forEach(([key, value]) => {
            if (value == true) {
               this.setState({
                   services: [...this.state.services, key]
               });
            }
        });
        this._refreshReaction();
    }

    FlatListItemSeparator = () => (
        <View style={styles.flatListSeparator} />
    );

    RenderFlatListFooter = () => (
        <View style={styles.flatListFooter} />
    );

    RenderFlatListStickyHeader = () => {
        const { search } = this.state;
        const { navigation } = this.props;

        return (
            <View style={styles.appletFlatListHeader}>
                <Text style={styles.flatListHeaderTitle}>Create your Applet !</Text>
                <Text style={styles.flatListHeaderTitle}>{this.props.navigation.getParam('step')}</Text>
            </View>
        );
    }

    _actuAction = (input, name, data) => {
        let obj = {
            "name": name,
            "params": input,
            "data": data
        }
        this.setState({ finalAction: obj });
    }

    RenderFlatListItem = ({ item }) => (
        <AppletCard
            item={item}
            navigation={this.props.navigation}
            action={this.props.navigation.getParam('step')}
            actuAction={this._actuAction}
            finalAction={this.state.finalAction}
            applet={this.state.reaction}
        />
    );

    render() {
        const { navigation } = this.props;
        return (
            <View>
                <FlatList
                    data={this.props.navigation.getParam('step') == "Action" ? this.state.action : this.state.reaction}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={this.RenderFlatListItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={this.RenderFlatListStickyHeader}
                    ListFooterComponent={this.RenderFlatListFooter}
                />
            </View>
                );
        }
}