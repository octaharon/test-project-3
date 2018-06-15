import React from 'react';
import expect from 'expect';
import ShallowRendered from 'react-test-renderer/shallow'
import ReactTestUtils from 'react-dom/test-utils';
import {UserPage} from "./UserPage";

const routerDataMock =
    {
        match: {
            params: {
                user_id: 1
            }
        }
    };
const sampleList = [
    {
        id: 200,
        login: 'test-1',
        url: 'http://test.domain/url/test-1',
        type: 'User',
        site_admin: false,
    },
    {
        id: 201,
        login: 'test-2',
        url: 'http://test.domain/url/test-2',
        avatar_url: 'https://avatars0.githubusercontent.com/u/6?v=4',
        type: 'User',
        site_admin: false,
    }
];
const sampleUser = {
    id: 1,
    login: 'test-login',
    url: 'http://test.domain/test',
    avatar_url: 'https://www.google.ru/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    type: 'Type',
    site_admin: true
};

const shallow = new ShallowRendered();

describe("UserPage", function () {
    it("without List parameter:  displays preloader", (done) => {
        try {
            shallow.render(<UserPage/>);
            let subject = shallow.getRenderOutput();
            expect(subject.type).toBe('div');
            expect(subject.props).toHaveProperty('id', 'preloader');
            done();
        }
        catch (err) {
            done(err);
        }
    });

    it("with some list, without Router params:  displays preloader", (done) => {
        try {
            shallow.render(<UserPage list={sampleList}/>);
            let subject = shallow.getRenderOutput();
            expect(subject.type).toBe('div');
            expect(subject.props).toHaveProperty('id', 'preloader');
            done();
        }
        catch (err) {
            done(err);
        }
    });

    it("with some list, router param user_id, which is not on the list: creates Redirect", (done) => {
        try {
            shallow.render(<UserPage list={sampleList} {...routerDataMock}/>);
            let subject = shallow.getRenderOutput();
            expect(typeof subject.type).toBe('function');
            expect(subject.props).toHaveProperty('to', '/');
            done();
        }
        catch (err) {
            done(err);
        }
    });

    it("with empty list, router param user_id, which is not on the list: creates Redirect", (done) => {
        try {
            shallow.render(<UserPage list={[]} {...routerDataMock}/>);
            let subject = shallow.getRenderOutput();
            expect(typeof subject.type).toBe('function');
            expect(subject.props).toHaveProperty('to', '/');
            done();
        }
        catch (err) {
            done(err);
        }
    });

    it("with some list, router param user_id, which is on the list: renders data", (done) => {
        try {
            let subject = ReactTestUtils.renderIntoDocument(
                <UserPage
                    list={sampleList.concat([sampleUser])} {...routerDataMock}/>
            );
            let backButton = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'btn-info back');
            expect(backButton).toBeTruthy();
            expect(backButton.tagName).toEqual('A');
            let imgContainer = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'user-picture');
            expect(imgContainer).toBeTruthy();
            let img = imgContainer.querySelector('img');
            expect(img).toBeTruthy();
            expect(img.src).toEqual(sampleUser.avatar_url);
            let items = ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'list-group-item');
            expect(items).toHaveProperty('length', 4);
            expect(items[2].innerHTML).toContain(sampleUser.type);

            done();
        }
        catch (err) {
            done(err);
        }
    });
});