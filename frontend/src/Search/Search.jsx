import { useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Stack, Button, TextField } from '@mui/material';

import { search as searchApi } from '../api/search';
import SearchResultsList from './SearchResultsList';

const Search = () => {
    const allContentTypes = [
        "track",
        "artist",
        "album",
        "playlist"
        // GOING TO LEAVE THESE OUT FOR NOW
        // "show", 
        // "episode", 
        // "audiobook"
    ];

    const mapTypeToRestultKey = {
        track: 'tracks',
        artist: 'artists',
        album: 'albums',
        playlist: 'playlists'
    }

    const [selectedContentType, setSelectedContentType] = useState(allContentTypes[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState({});
    const [resultsPagination, setResultsPagination] = useState({});

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
                backgroundColor: '#121212',
                color: 'white',
            },
        },
    };

    const handleChangeSelectedType = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedContentType(value);
        if (searchQuery) {
            getSearchResults(value);
        }
    }

    const handleSearchChange = (event) => {
        const {
            target: { value },
        } = event;

        setSearchQuery(value);
    }

    const getSearchResults = async (contentType = selectedContentType, page) => {
        const currentPage = page || resultsPagination[contentType] || 1;
        const limit = 8;
        const offset = (currentPage - 1) * limit;
        const query = searchQuery;
        const types = [contentType];
        const { data } = await searchApi({ limit, offset, query, types });
        const resultKey = mapTypeToRestultKey[contentType];
        setSearchResults(prevState => ({ ...prevState, [contentType]: data[resultKey] }));
        setResultsPagination(prevState => ({ ...prevState, [contentType]: offset }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        getSearchResults(selectedContentType);
    }

    const clearForm = () => {
        setSearchQuery('');
        setSelectedContentType(allContentTypes[0]);
        setResultsPagination({});
        setSearchResults({});
    };

    const handlePageChange = (page) => {
        setResultsPagination(prevState => ({ ...prevState, [selectedContentType]: page }));
        getSearchResults(selectedContentType, page);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <TextField
                        size="small"
                        id="Search-input"
                        label="Search"
                        value={searchQuery}
                        variant="outlined"
                        onChange={handleSearchChange}
                        autoComplete="off"
                    />
                    <Button onClick={handleSubmit} type="submit" variant="contained">Search</Button>
                    <Button onClick={clearForm} variant="outlined">Clear</Button>

                </Stack>
            </form>
            <Stack>
                <ToggleButtonGroup
                    value={selectedContentType}
                    exclusive
                    onChange={handleChangeSelectedType}
                    aria-label="Selected Content Type"
                >
                    {allContentTypes.map((type) => (
                        <ToggleButton key={type} value={type} aria-label={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Stack>
            <SearchResultsList changePage={handlePageChange} results={searchResults[selectedContentType]} contentType={selectedContentType} />
        </>
    );
}

export default Search;