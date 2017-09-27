import './index-page.styl';

import React from 'react';
import ReactDom from 'react-dom';
import AppComponent from 'components/app-component/app-component';

(function () {
    ReactDom.render(
        <AppComponent />,
        document.getElementById('root')
    );
}());
