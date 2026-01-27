import { useEffect, useState } from 'react';

import { getUsersPlaylists } from '../api/library';
import List from './List'
import styles from './List.styles';

const UserPlaylists = () => {
    const [playlists, setPlaylists] = useState({total: 0, items: []});
    const [currentPage, setCurrentPage] = useState(1);
    const { fullWidth } = styles;

    const getPlaylists = async () => {
        const { data: { items = [], total } = {} } = await getUsersPlaylists(10, (currentPage - 1) * 10);
        
        const listItems = items.map(({ name, description, images, id, uri, type} = {}) => ({
            name, description, avatar: images, id, uri, type 
        }))
        setPlaylists({ items: listItems || [], total });
    }

    const handlePageChange = (value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        getPlaylists();
    }, [currentPage]);

    return (<div style={fullWidth}>
        <List items={playlists.items} itemsPerPage={10} currentPage={currentPage} total={playlists.total} onPageChange={handlePageChange} />
    </div>
    )
};

export default UserPlaylists;