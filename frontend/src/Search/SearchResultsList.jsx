import { useState } from 'react';

import List from '../Library/List'
import styles from './SearchResultsList.styles';

const SearchResultsList = ({ results, contentType, changePage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { restultsContainer } = styles;
    const { items = [], offset = 0, total } = results || {};

    const handlePageChange = (page) => {
        changePage(page);
    };

    // Need to filter out nulls because Spotify sometimes returns nulls in the search results
    const listItems = items.filter(Boolean).map(({ name, description, images, id, uri, type } = {}) => ({
        name, description, avatar: images, id, uri, type
    }))

    return (<div style={restultsContainer}>
        <List items={listItems} itemsPerPage={10} currentPage={currentPage} total={total} onPageChange={handlePageChange} />
    </div>
    )
};

export default SearchResultsList;