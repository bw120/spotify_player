import { usePlayerContext } from "./PlayerContext";
import PlayBackControl from "./PlayBackControl";
import VolumeControl from "./VolumeControl";

const Player = () => {
  const { playbackState } = usePlayerContext()

  return (<>
    {playbackState ? <PlayBackControl /> : <div>Nothing is currently playing.</div>}
    <VolumeControl />
  </>);
};

export default Player;