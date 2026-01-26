import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PlaylistPlayRoundedIcon from '@mui/icons-material/PlaylistPlayRounded';


import { useAppContext } from "./AppContext";
import { PlayerProvider } from "./Player/PlayerContext";
import Player from './Player/Player'
import Library from './Library/Library';
import Search from './Search/Search';
import styles from './Main.styles';
import { APP_SCREENS } from "./constants";

const ScreenMap = {
  [APP_SCREENS.SEARCH]: Search,
  [APP_SCREENS.LIBRARY]: Library,
  [APP_SCREENS.PLAYER]: Player,
}

const Main = () => {
  const { selectedScreen, setSelectedScreen } = useAppContext();
  const { bottomNav, containerStyles, contentScreenStyles } = styles;
  const handleNavChange = (_e, value) => setSelectedScreen(value);
  const SelectedScreen = ScreenMap[selectedScreen];

  return (
    <Box sx={containerStyles}>
      <Box sx={contentScreenStyles} >
        <PlayerProvider>
          <SelectedScreen />
        </PlayerProvider>
      </Box>
      <BottomNavigation
        showLabels
        value={selectedScreen}
        onChange={handleNavChange}
        sx={bottomNav}
      >
        <BottomNavigationAction label="Search" icon={<SearchRoundedIcon />} />
        <BottomNavigationAction
          label="Music Library"
          icon={<PlaylistPlayRoundedIcon />}
        />
        <BottomNavigationAction label="Music Player" icon={<MusicNoteIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default Main;
