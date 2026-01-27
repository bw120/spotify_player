import { useEffect, useState } from 'react';

import { getUsersTop } from '../api/library';
import List from './List'
import styles from './List.styles';

const TopArtists = () => {
    const [artists, setArtists] = useState({total: 0, items: []});
    const [currentPage, setCurrentPage] = useState(1);
    const { fullWidth } = styles;

    const getArtists = async () => {
         const { data: { items = [], total } = {} } = await getUsersTop('artists', 10, (currentPage - 1) * 10);
        const listItems = items.map(({ name, description, images, id, uri, type} = {}) => ({
            name, description, avatar: images, id, uri, type 
        }))
        setArtists({ items: listItems || [], total });
    }

    const handlePageChange = (value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        getArtists();
    }, [currentPage]);

    return (<div style={fullWidth}>
        <List items={artists.items} itemsPerPage={10} currentPage={currentPage} total={artists.total} onPageChange={handlePageChange} />
    </div>
    )
};

export default TopArtists;