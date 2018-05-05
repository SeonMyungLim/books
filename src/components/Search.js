import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as _ from 'lodash';
import * as R from 'ramda';
import * as BooksAPI from '../api/BooksAPI';
import Book from './Book';

class Search extends Component {
    constructor(props) {
        super(props);
        this.search = _.debounce(this.search, 200);
        this._search = _.memoize(this._search);
        this.state = {
            books: [],
        };
    }
    componentDidMount() {
        this.generateBookMap();
    }
    generateBookMap() {
        return new Promise(async (resolve, reject) => {
            var books = await BooksAPI.getAll();
            this.setState({
                bookMap: books.reduce((acc, { id, shelf }) => {
                    acc[id] = shelf;
                    return acc;
                }, {}),
            });
            resolve();
        });
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={R.compose(
                                this.search.bind(this),
                                R.prop('value'),
                                R.prop('target')
                            )}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">{this.renderBooks()}</ol>
                </div>
            </div>
        );
    }

    async updateBook(book, shelf) {
        await BooksAPI.update(book, shelf);
        await this.generateBookMap();
        this.setBooks(this.state.books);
    }

    renderBooks() {
        var { books } = this.state;
        if (!books || _.isEmpty(books)) {
            return <div />;
        }
        return books.map((book) => (
            <Book
                key={book.id}
                book={book}
                updateBook={this.updateBook.bind(this)}
            />
        ));
    }

    setBooks(books = []) {
        this.setState({
            books: books.map((book) =>
                Object.assign(book, {
                    shelf: this.state.bookMap[book.id] || 'none',
                })
            ),
        });
    }

    _search(words) {
        return BooksAPI.search(words);
    }

    async search(words = '') {
        if (!words) {
            this.setBooks([]);
        } else {
            var books = await this._search(words);
            this.setBooks(Array.isArray(books) ? books : []);
        }
    }
}

export default Search;
