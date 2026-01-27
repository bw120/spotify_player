
import { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import TopPlaylists from "./UserPlayLists";
import TopArtists from "./TopArtistsList";
import styles from './Library.styles';

const Library = () => {
  const [selectedList, setSelectedList] = useState('topPlaylists');
  const { libraryContainer} = styles;

  const handleChangeSelectedList = (event, newValue) => {
    setSelectedList(newValue);
  }

  const PlayListMap = {
    'topPlaylists': TopPlaylists,
    'topArtists': TopArtists
  }
  const PlayList = PlayListMap[selectedList];
  return (
    <div style={libraryContainer}>
      <ToggleButtonGroup
        value={selectedList}
        exclusive
        onChange={handleChangeSelectedList}
        aria-label="Selected Library List"
      >
        <ToggleButton value="topPlaylists" aria-label="My Playlists">My Playlists</ToggleButton>
        <ToggleButton value="topArtists" aria-label="Top Artists">Top Artists</ToggleButton>

      </ToggleButtonGroup>
      <PlayList />
    </div>
  )
};

export default Library;