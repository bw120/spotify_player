import { Card, Stack, Typography } from '@mui/material';

import { usePlayerContext } from "./PlayerContext";
import PlayBackControl from "./PlayBackControl";
import VolumeControl from "./VolumeControl";
import styles from './Player.styles';

const Player = () => {
  const { playbackState } = usePlayerContext()
  const { container } = styles;
  return (<>
    {playbackState ? <PlayBackControl /> : <Stack sx={container}><h2>Nothing is currently playing.</h2></Stack>}
    <VolumeControl />
  </>);
};

export default Player;