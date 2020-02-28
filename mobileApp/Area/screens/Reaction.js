/*----Import React----*/
import React from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    ScrollView
} from 'react-native';

/*----Import Components----*/
import InputApplet from '../components/InputApplet';

/*----Import Styles----*/
import { styles } from '../Style';

export default class Action extends React.Component {
    static navigationOptions = {
        title: "Reaction"
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
                <Text style={styles.appletFormName}> {navigation.getParam('item').name}</Text>
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
        const { navigation } = this.props;
        let obj = {
            "name": navigation.getParam('item').id,
            "params": this.state.input,
            "title": navigation.getParam('item').name
        }

        if (this.state.params.length == Object.keys(this.state.input).length) { //Si tous les champs sont rempli c'est ok
            navigation.navigate('New Applet', {action: navigation.getParam('finalAction'), reaction: obj});
        }
    }

    RenderFlatListFooter = () => {
        const { navigation } = this.props;

        if ( navigation.getParam('finalAction').data.length == 0 ) {
            return;
        } else {
            return (
                <View style={{marginTop: 20, marginBottom: 10}}>
                    <TouchableOpacity
                     style={styles.cardContainer}
                     onPress={this._redirect}
                     >
                        <Text style={[styles.appletCardTitle, {textAlign: 'center', marginTop: 10}]}>
                            Tips
                        </Text>
                        <Text style={styles.dataForm}>
                            Type "$data" to get the data of the action
                        </Text>
                        <Text style={[styles.appletCardTitle, {textAlign: 'center', marginTop: 10}]}>
                            Available data
                        </Text>
                        <Text style={styles.dataForm}>
                            {navigation.getParam('finalAction').data.join(' / ')}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    render() {
        const { navigation, item } = this.props;
        return (
            <SafeAreaView>
                <ScrollView style={styles.appletDescriptionContainer}>
                <View>
                    <FlatList
                        data={this.state.params}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={this.RenderFlatListItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={this.RenderFlatListStickyHeader}
                        ListFooterComponent={this.RenderFlatListFooter}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                    style={styles.appletBtn}
                    onPress={this._redirect}
                    >
                        <Text style={styles.loginText}>Next</Text>
                    </TouchableOpacity>

                </View>
                </ScrollView>
            </SafeAreaView>
                );
        }
}