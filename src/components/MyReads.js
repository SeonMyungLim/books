import React, { Component } from 'react';
import * as BooksAPI from '../api/BooksAPI';
import * as _ from 'ramda';

import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';

class MyReads extends Component {
    state = {
        books: {},
    };
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">{this.renderShelves()}</div>
                <div className="open-search">
                    <Link to='/search'>
                        Add a book
                    </Link>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.setAll();
    }

    renderShelves() {
        var { books } = this.state;
        if (_.isEmpty(books)) {
            return;
        }

        return ['currentlyReading', 'wantToRead', 'read'].map((key) => (
            <BookShelf
                books={books[key]}
                key={key}
                title={key}
                updateBook={this.updateBook.bind(this)}
            />
        ));
    }

    async updateBook(book, shelf) {
        await BooksAPI.update(book, shelf);
        this.setAll();
    }

    async setAll() {
        var books = _.groupBy(({ shelf }) => {
            return shelf;
        }, await BooksAPI.getAll());
        this.setState({ books });
    }
}

export default MyReads;
