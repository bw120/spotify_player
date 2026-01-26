
import { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { LibraryProvider } from "./LibraryContext";
import TopPlaylists from "./UserPlayLists";



const Library = () => {
  const [selectedList, setSelectedList] = useState('topPlaylists');

  const handleChangeSelectedList = (event, newValue) => {
    setSelectedList(newValue);
  }

  const PlayListMap = {
    'topPlaylists': TopPlaylists,
    'featured': () =><div>Featured Playlists</div>
  }
  const PlayList = PlayListMap[selectedList];
  console.log('selectedList', selectedList);
  return (
    <LibraryProvider>
      {({ } = {}) => {
        return (
          <>
            <ToggleButtonGroup
              value={selectedList}
              exclusive
              onChange={handleChangeSelectedList}
              aria-label="Selected Library List"
            >
              <ToggleButton value="topPlaylists" aria-label="My Playlists">My Playlists</ToggleButton>
              <ToggleButton value="featured" aria-label="Featured Playlists">Featured</ToggleButton>

            </ToggleButtonGroup>
            <PlayList/>
          </>
        );
      }}
    </LibraryProvider>
  )
};

export default Library;