import { useState } from 'react';
import { Box, Button, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Chip, TextField } from '@mui/material';

import { search as searchApi } from '../api/search';

const Search = () => {
    const AllContentTypes = ["album", "artist", "playlist", "track", "show", "episode", "audiobook"];
    const defaultContentTypes = ['Track', 'Album', 'Artist', 'Playlist'];
    const [selectedContentTypes, setSelectedContentTypes] = useState([...defaultContentTypes]);
    const [searchQuery, setSearchQuery] = useState('');
    
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

    const handleContentTypeChange = (event) => {
        const {
            target: { value },
        } = event;

        setSelectedContentTypes(value);
    }

        const handleSearchChange = (event) => {
        const {
            target: { value },
        } = event;

        setSearchQuery(value);
    }

    const getSearchResults = async () => {
        const limit = 20;
        const offset = 0;
        const query = searchQuery;
        const types = selectedContentTypes.map(type => type.toLowerCase());

        const results = await searchApi({ limit, offset, query, types });
        console.log('Search results:', results);
    };

    const clearForm = () => {
        setSearchQuery('');
        setSelectedContentTypes(defaultContentTypes);
    };

    return (
        <>
            <FormControl required sx={{ m: 1, width: 300 }}>
                <InputLabel id="content-type-label">Content Type</InputLabel>

                <Select
                    labelId="content-type-label"
                    id="content-type-label"
                    multiple
                    value={selectedContentTypes}
                    onChange={handleContentTypeChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Content Type" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {AllContentTypes.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: 300 }}>
                <TextField
                    required
                    id="Search-input"
                    label="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </FormControl>

            <Button onClick={getSearchResults} variant="contained">Search</Button>
            <Button onClick={clearForm} variant="outlined">Clear</Button>
        </>
    );
}

export default Search;