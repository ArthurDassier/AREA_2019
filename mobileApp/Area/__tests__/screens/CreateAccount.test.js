// __tests__/Intro-test.js
import React from 'react';
import CreateAccount from '../../screens/CreateAccount';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';


describe('CreateAccount screen', () => {
  it('CreateAccount screen: renders correctly', () => {
    const tree = renderer.create(<CreateAccount />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CreateAccount screen: Check initial state value', () => {
    const wrapper = shallow(<CreateAccount />);
    expect(wrapper.instance().state.showPwd).toBe(true);
    expect(wrapper.instance().state.pressed).toBe(false);
    expect(wrapper.instance().state.username).toBe("");
    expect(wrapper.instance().state.mail).toBe("");
    expect(wrapper.instance().state.password).toBe("");
    expect(wrapper.instance().state.confirmedPassword).toBe("");
    expect(wrapper.instance().state.emptyField).toBe(false);
    expect(wrapper.instance().state.wrongMail).toBe(false);
    expect(wrapper.instance().state.badPassword).toBe(false);
    expect(wrapper.instance().state.pwdDoesntMatch).toBe(false);
    expect(wrapper.instance().state.badAccount).toBe("");
  });
  it('CreateAccount screen: should put ON the secure password entry', () => {
    const wrapper = shallow(<CreateAccount />);
    const instance = wrapper.instance();
    instance._showPwd();
    expect(instance.state.showPwd).toBe(false);
    expect(instance.state.pressed).toBe(true);
    instance._showPwd();
    expect(instance.state.showPwd).toBe(true);
    expect(instance.state.pressed).toBe(false);
  });
  it('CreateAccount screen: check email validation format', () => {
    const wrapper = shallow(<CreateAccount />);
    const instance = wrapper.instance();
    expect(instance._validate("louis@gmail.com")).toBe(true);
    expect(instance._validate("louisgmail.com")).toBe(false);
    expect(instance._validate("louis@gmail.")).toBe(false);
    expect(instance._validate("@gmail.")).toBe(false);
  });
  it('CreateAccount screen: check account data', () => {
    const navigation = { navigate: jest.fn() };
    const wrapper = shallow(<CreateAccount navigation={navigation} />);
    const instance = wrapper.instance();
    instance._checkAccount({ "status": "success" })
    instance._checkAccount({ "message": "error" })
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CreateAccount screen:  create an account', () => {
    const wrapper = shallow(<CreateAccount />);
    const instance = wrapper.instance();
    instance._createMyAccount();
    const emptyField = renderer.create(wrapper).toJSON();
    expect(emptyField).toMatchSnapshot();
    instance.setState({username: "a", password: "aaaaaa", confirmedPassword: "aaaaa", mail:"l"})
    instance._createMyAccount();
    const wrongMail = renderer.create(wrapper).toJSON();
    expect(wrongMail).toMatchSnapshot();
    instance.setState({mail: "louis@gmail.com"})
    instance._createMyAccount();
    const pwdDoesntMatch = renderer.create(wrapper).toJSON();
    expect(pwdDoesntMatch).toMatchSnapshot();
  });


});