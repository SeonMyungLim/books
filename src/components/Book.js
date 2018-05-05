import React, { Component } from 'react';
import * as _ from 'ramda';

class Book extends Component {
    render() {
        var { book, updateBook } = this.props;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div
                            className="book-cover"
                            style={this.getBookStyle()}
                        />
                        <div className="book-shelf-changer">
                            <select
                                onChange={({ target: { value } }) => {
                                    updateBook(book, value);
                                }}
                                value={book.shelf}
                            >
                                <option value="none" disabled>
                                    Move to...
                                </option>
                                <option value="currentlyReading">
                                    Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">
                        {(book.authors || []).join(' ')}
                    </div>
                </div>
            </li>
        );
    }

    getBookStyle() {
        var { book } = this.props;

        if (_.isEmpty(book)) {
            return;
        }
        var { imageLinks: { thumbnail } = {} } = book;
        return {
            width: 128,
            height: 193,
            backgroundImage: `url("${thumbnail}")`,
        };
    }
}

export default Book;
