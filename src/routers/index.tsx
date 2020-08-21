import * as React from 'react'
import Home from '../pages/home';
import Page1 from '../pages/page1';
import Page2 from '../pages/page2';


const routes = [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '/page1',
                component: Page1
            },
            {
                path: '/page2',
                component: Page2
            }
        ]
    }
]

export { routes }