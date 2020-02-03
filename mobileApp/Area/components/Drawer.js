/*----Import React----*/
import React, { Component } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { DrawerItems } from 'react-navigation-drawer';

/*----Import Styles----*/
import { styles } from '../Style';

export default class Drawer extends Component {
    constructor(props) {
        super(props);
    }

    renderHeader = () => (
        <View style={styles.drawerHeader}>
            <Image
                source={require('../assets/area.png')}
                style={styles.drawerHeaderImage}
                resizeMethod={'scale'}
                resizeMode={'contain'}
            />
        </View>
    );

    renderFooter = () => (
        <View style={styles.drawerFooter}>
            <View style={styles.row}>
                <View style={styles.drawerFooterIconContainer}>
                    <Icon
                        name={"flask"}
                        style={styles.drawerFooterIcon}
                    />
                </View>
                <View style={styles.column}>
                    <Icon
                        name="phone"
                        style={styles.drawerFooterIcon}
                    />
                </View>
            </View>
        </View>
    );

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {this.renderHeader()}
                <ScrollView>
                    <DrawerItems {...this.props} />
                </ScrollView>
            </SafeAreaView>
        );
    }
};