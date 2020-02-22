/*----Import React----*/
import React from 'react';
import {
    Text,
    View,
    FlatList
} from 'react-native';

/*----Import Utils----*/
import { getAccessToken } from '../utils/common';

/*----Import Styles----*/
import { styles } from '../Style';

/*----Import COmponents----*/
import Trigger from '../components/Trigger';

export default class Applet extends React.Component {
    static navigationOptions = {
        title: "Applet"
    };

    constructor(props) {
        super(props);

        this.state = {
            data: [
                {description: "Add to Google Calendar facebooke registered event"},
                {description: "Add to Google Calendar facebooke registered event"},
                {description: "Add to Google Calendar facebooke registered event"},
                {description: "Add to Google Calendar facebooke registered event"},
                {description: "Add to Google Calendar facebooke registered event"},
                {description: "Add to Google Calendar facebooke registered event"},
                {description: "Add to Google Calendar facebooke registered event"},
                {description: "Add to Google Calendar facebooke registered event"},
                {description: "Add to Google Calendar facebooke registered event"},
                {description: "Add to Google Calendar facebooke registered event"},
                {description: "Add to Google Calendar facebooke registered event"},
                {description: "Add to Google Calendar facebooke registered event"}
            ],
        };
        this.arrayHolder = [];
    }

    FlatListItemSeparator = () => (
        <View style={styles.flatListSeparator} />
    );

    RenderFlatListFooter = () => (
        <View style={styles.flatListFooter} />
    );

    RenderFlatListStickyHeader = () => {
        const { search } = this.state;

        return (
            <View style={styles.flatListHeader}>
                <Text style={styles.flatListHeaderTitle}>Explore</Text>
            </View>
        );
    }


    RenderFlatListItem = ({ item }) => (
        <Trigger
            item={item}
            navigation={this.props.navigation}
        />
    );


    render() {
        const { navigation } = this.props;
        return (
            <View>
                <FlatList
                    data={this.state.data}
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