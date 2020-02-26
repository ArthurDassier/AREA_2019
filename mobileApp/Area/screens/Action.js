/*----Import React----*/
import React from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';

/*----Import Components----*/
import InputApplet from '../components/InputApplet';

/*----Import Styles----*/
import { styles } from '../Style';

export default class Action extends React.Component {
    static navigationOptions = {
        title: "Action"
    };

    constructor(props) {
        super(props);

        this.state = {
            params: [],
            input: {

            },
        };
        this.Actualizeresponse = this.Actualizeresponse.bind(this);
    }

    componentDidMount = () => {
        const { navigation } = this.props;

        this.setState({params: navigation.getParam('item').params})
        if (navigation.getParam('item').params.length == 0)
            this._redirect();
    }

    Actualizeresponse = (txt, name) => {
        this.setState({ input: {...this.state.input, [name]: txt}});
    }

    FlatListItemSeparator = () => (
        <View style={styles.flatListSeparator} />
    );

    RenderFlatListStickyHeader = () => {
        const { navigation } = this.props;

        return (
            <View style={styles.appletFlatListHeader}>
                <Text style={styles.flatListHeaderTitle}> Fill the parameters !</Text>
                <Text style={styles.flatListHeaderTitle}> {navigation.getParam('item').name}</Text>
            </View>
        );
    }

    RenderFlatListItem = ({ item }) => (
        <InputApplet
            item={item}
            navigation={this.props.navigation}
            save={this.Actualizeresponse}
        />
    );

    _redirect = () => {
        const { navigation} = this.props;

        navigation.getParam('action')(this.state.input, navigation.getParam('item').id, navigation.getParam('item').datas);
        if (this.state.params.length == Object.keys(this.state.input).length) { //Si tous les champs sont rempli
            this.props.navigation.navigate('Applet', { item: this.props.item, step: "Reaction"});
        }
    }

    render() {
        const { navigation, item } = this.props;
        return (
            <View>
                <View>
                    <FlatList
                        data={this.state.params}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={this.RenderFlatListItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={this.RenderFlatListStickyHeader}
                    />
                </View>
                <View>
                    <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={this._redirect}
                    >
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>

                </View>
            </View>
                );
        }
}