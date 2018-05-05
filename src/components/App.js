import React from 'react';
import '../App.css';

import MyReads from './MyReads';
import Search from './Search';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={MyReads} />
                <Route exact path="/search" component={Search} />
            </div>
        );
    }
}

export default BooksApp;
