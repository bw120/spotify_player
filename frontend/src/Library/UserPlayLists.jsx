import { useEffect, useState } from 'react';

import { getUsersPlaylists } from '../api/library';
import List from './List'

const UserPlaylists = () => {
    const [playlists, setPlaylists] = useState({total: 0, items: []});
    const [currentPage, setCurrentPage] = useState(1);

    const getPlaylists = async () => {
        const { data: { items = [], total } = {} } = await getUsersPlaylists(5, (currentPage - 1) * 5);
        
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

    
    return (<div>
        <List items={playlists.items} itemsPerPage={5} currentPage={currentPage} total={playlists.total} onPageChange={handlePageChange} />
    </div>
    )
};

export default UserPlaylists;