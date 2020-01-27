// __tests__/Intro-test.js
import React from 'react';
import Login from '../../screens/Login';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';


describe('Login screen', () => {
    it('Login screen: renders correctly', () => {
        const tree = renderer.create(<Login />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Login screen: Check initial state value', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.instance().state.secureEntry).toBe(true);
        expect(wrapper.instance().state.pressed).toBe(false);
        expect(wrapper.instance().state.username).toBe("");
        expect(wrapper.instance().state.password).toBe("");
        expect(wrapper.instance().state.emptyField).toBe(false);
        expect(wrapper.instance().state.badCredentials).toBe(false);
    });
    it('Login screen: should put ON the secure password entry', () => {
        const wrapper = shallow(<Login />);
        const instance = wrapper.instance();
        instance._showPwd();
        expect(instance.state.secureEntry).toBe(false);
        expect(instance.state.pressed).toBe(true);
    });
    it('Login screen: should put ON the secure password entry', () => {
        const wrapper = shallow(<Login />);
        const instance = wrapper.instance();
        instance._showPwd();
        instance._showPwd();
        expect(instance.state.secureEntry).toBe(true);
        expect(instance.state.pressed).toBe(false);
    });
    it('Login screen: should put off emptyFields STATE and naviguate to CreateAccount screen', () => {
        const navigation = { navigate: jest.fn() };
        const wrapper = shallow(<Login navigation={navigation} />);
        const instance = wrapper.instance();
        instance._createAccount();
        expect(instance.state.emptyField).toBe(false);
        expect(instance.state.screenTitle).toBe("CreateAccount");
    });
    it('Login screen: Try to connect', () => {
        const wrapper = shallow(<Login />);
        const instance = wrapper.instance();
        instance._log();
    });
    it('Login screen: Check data received by server', () => {
        const navigation = { navigate: jest.fn() };
        const wrapper = shallow(<Login navigation={navigation}/>);
        const instance = wrapper.instance();
        instance._checkFetch("");
        expect(instance.state.badCredentials).toBe(true);
        instance._checkFetch({"access_token": "eee"});
    });
    it('Login screen:  Display Errors', () => {
        const wrapper = shallow(<Login />);
        const instance = wrapper.instance();
        instance._log();
        const emptyField = renderer.create(wrapper).toJSON();
        expect(emptyField).toMatchSnapshot();
      });
});