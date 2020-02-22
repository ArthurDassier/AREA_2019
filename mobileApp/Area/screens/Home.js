/*----Import React----*/
import React from 'react';
import {
    FlatList,
    Text,
    View
} from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';

/*----Import Components----*/
import Card from '../components/Card';

/*----Import Services----*/
import { getServicesList } from '../services/services';
import { getUserServices } from '../services/user';

/*----Import Utils----*/
import { getAccessToken } from '../utils/common';

/*----Import Styles----*/
import { styles } from '../Style';

/*----Import Errors----*/
const ER = require('../config/errors.json');

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            search: '',
            services: []
        };
        this.arrayHolder = [];
    }

    componentDidMount = () => {
        this.asyncCall();
    }

    asyncCall = async () => {
        let data = await getServicesList();
        let services = await getUserServices(getAccessToken());
        let goodData = this.goodDataFormat(data);

        if (typeof goodData == 'undefined') {
            this.arrayHolder = ER.errors;
            this.setState({ data: ER.errors })
        } else {
            this.arrayHolder = goodData;
            this.setState({ data: goodData });
        }

        Object.entries(services).forEach(([key, value]) => {
            if (value == true) {
               this.setState({
                   services: [...this.state.services, key]
               });
            }
        });
    }

    goodDataFormat = (object) => {
        let goodData = []
        let card = {}

        Object.entries(object).forEach(([key, value]) => {
            if (key != "endpoint_path") {
               card = value;
               card = {
                   ...card,
                   ["id"]: key
               }
        }
            goodData.push(card)
        });
        return goodData;
    }

    searchFilter = (search) => {
        const data = this.arrayHolder.filter(item => {
            const itemData = `${item.title.toUpperCase()}
                ${item.id.toUpperCase()}
                ${item.description.toUpperCase()}`;
            const textData = search.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({ search, data });
    }

    clearSearch = () => {
        this.setState({ search: '' });
        this.searchFilter('');
    }

    RenderSearchIcon = () => (
        <Icon
            name={'search'}
            type={'feather'}
        />
    );

    RenderClearIcon = () => (
        <Icon
            name={'x'}
            type={'feather'}
            onPress={this.clearSearch}
        />
    );

    FlatListItemSeparator = () => (
        <View style={styles.flatListSeparator} />
    );

    RenderFlatListStickyHeader = () => {
        const { search } = this.state;

        return (
            <View style={styles.flatListHeader}>
                <Text style={styles.flatListHeaderTitle}>Explore</Text>
                <SearchBar
                    containerStyle={[
                        styles.searchBarContainer,
                        search == ''
                            ? styles.searchBarContainerInactive
                            : styles.searchBarContainerActive
                    ]}
                    inputContainerStyle={
                        search == ''
                            ? styles.searchBarInputContainerInactive
                            : styles.searchBarInputContainerActive
                    }
                    inputStyle={styles.colorBlack}
                    placeholder={'Search'}
                    placeholderTextColor={'black'}
                    onChangeText={this.searchFilter}
                    searchIcon={this.RenderSearchIcon}
                    clearIcon={this.RenderClearIcon}
                    value={this.state.search}
                />
            </View>
        );
    }

    RenderFlatListFooter = () => (
        <View style={styles.flatListFooter} />
    );

    RenderFlatListItem = ({ item }) => (
        <Card
            item={item}
            connectedServices={this.state.services}
            navigation={this.props.navigation}
        />
    );

    render() {
        return (
            <View style={styles.bg}>
                <FlatList
                    data={this.state.data}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={this.RenderFlatListItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={this.RenderFlatListStickyHeader}
                    ListFooterComponent={this.RenderFlatListFooter}
                // stickyHeaderIndices={[0]}
                />
            </View>
        );
    }
}