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

/*----Import Styles----*/
import { styles } from '../Style';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            search: ''
        };
        this.arrayHolder = [];
    }

    componentDidMount = () => {
        this.asyncCall();
    }

    asyncCall = async () => {
        let data = [
            {
                title: 'JARVIS 4EVER',
                description: 'blabla',
                uri: 'http://wiki.marvel-world.com/images/thumb/8/83/J.A.R.V.I.S_Terre_199999_Portrait.jpg/300px-J.A.R.V.I.S_Terre_199999_Portrait.jpg',
                color: 'white',
                dimensions: {
                    height: 300,
                    width: 300
                }
            },
            {
                title: 'Apricot',
                description: 'blabla',
                uri: '',
                color: 'rgb(22,110,251)',
                dimensions: {
                    height: 100,
                    width: 300
                }
            },
            {
                title: 'Coronavirus',
                description: 'blabla',
                uri: 'https://img.aws.la-croix.com/2018/08/16/1200962173/bieres-Corona_0_729_505.jpg',
                color: '#fff',
                dimensions: {
                    height: 300,
                    width: 300
                }
            },
            // {
            //     id: 3,
            //     title: 'Banana',
            //     color: 'rgb(35,68,139)',
            //     dimensions: {
            //         height: 300,
            //         width: 300
            //     }
            // },
            // {
            //     id: 4,
            //     title: 'Blackberry',
            //     dimensions: {
            //         height: 300,
            //         width: 300
            //     }
            // },
            // {
            //     id: 5,
            //     title: 'Blackcurrant',
            //     dimensions: {
            //         height: 300,
            //         width: 300
            //     }
            // },
            // {
            //     id: 6,
            //     title: 'Blueberry',
            //     dimensions: {
            //         height: 300,
            //         width: 300
            //     }
            // },
            // {
            //     id: 7,
            //     title: 'Boysenberry',
            //     dimensions: {
            //         height: 300,
            //         width: 300
            //     }
            // },
            // {
            //     id: 8,
            //     title: 'Cherry',
            //     dimensions: {
            //         height: 300,
            //         width: 300
            //     }
            // },
            // {
            //     id: 9,
            //     title: 'Coconut',
            //     dimensions: {
            //         height: 300,
            //         width: 300
            //     }
            // },
        ];
        this.arrayHolder = data;
        this.setState({ data });
    }

    searchFilter = (search) => {
        const data = this.arrayHolder.filter(item => {
            const itemData = `${item.title.toUpperCase()}`;
            const textData = search.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({ search, data });
    }

    clearSearch = () => {
        this.setState({ search: '' });
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