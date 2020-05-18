import React from "react";
import { shallow } from "enzyme";
import { LoginPage } from "../../components/LoginPage";

let wrapper, startLogin;

beforeEach(() => {
    startLogin = jest.fn();
    startLogin.mockReturnValue(new Promise(resolve => resolve()));
    wrapper = shallow(<LoginPage startLogin={startLogin} />);
});

test("Should render LoginPage",
    () => expect(wrapper).toMatchSnapshot());

test("Should call startLogin on button click",
    () => wrapper.find("button").prop("onClick")()
        .then(() => expect(startLogin).toHaveBeenCalledTimes(1)));