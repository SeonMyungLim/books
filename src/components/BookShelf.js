import React, { Component } from 'react';
import * as _ from 'ramda';
import Book from './Book';

class BookShelf extends Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.getTitle()}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">{this.renderBooks()}</ol>
                </div>
            </div>
        );
    }
    getTitle() {
        var { title } = this.props;
        if (_.isEmpty(title)) {
            return;
        }
        return {
            currentlyReading: 'Currently Reading',
            read: 'Read',
            wantToRead: 'Want to Read',
        }[title];
    }
    renderBooks() {
        var { books } = this.props;
        if (!books || _.isEmpty(books)) {
            return;
        }
        return books.map((book) => (
            <Book
                key={book.id}
                book={book}
                updateBook={this.props.updateBook}
            />
        ));
    }
}

export default BookShelf;
