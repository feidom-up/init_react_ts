import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import index from './index.less';
import { routes } from './routers';
ReactDOM.render(
    (<HashRouter>
        {renderRoutes(routes)}
    </HashRouter>),
    document.getElementById("root")
);