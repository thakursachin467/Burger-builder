import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './Navigationitems';
import React from 'react';
import NavigationItem from './Navigationitem/Navigationitem';

configure({adapter:new Adapter()})
describe('<NavigationItems/>',()=>{
    it('should   render 2 navigation items if not authenticated',()=>{
        const wrapper=shallow(<NavigationItems/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should   render 3 navigation items if  authenticated',()=>{
        const wrapper=shallow(<NavigationItems token/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should  be  a logout button',()=>{
        const wrapper=shallow(<NavigationItems token/>);
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});