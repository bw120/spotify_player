import { usePlayerContext } from "./PlayerContext";
import PlayBackControl from "./PlayBackControl";

const Player = () => {
  const { playbackState } = usePlayerContext()

  return playbackState ? <PlayBackControl /> : <div>Nothing is currently playing.</div>
};

export default Player;
