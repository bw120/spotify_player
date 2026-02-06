import { useState, useEffect, useRef } from "react";
import { Box, Slider, IconButton, Skeleton } from "@mui/material";
import { PauseRounded, PlayArrowRounded, FastForwardRounded, FastRewindRounded } from '@mui/icons-material';

import { pausePlayback, startPlayback, skipToNext, skipToPrevious, setPlaybackPosition } from "../api/player";
import { usePlayerContext } from "./PlayerContext";
import styles from './PlayBackControl.styles';

const PlayBackControl = () => {
    const [position, setPosition] = useState(0);
    const [paused, setPaused] = useState(false);
    const debounceTimer = useRef(null);
    const playbackTimer = useRef(null);
    const { sliderStyles, trackInfoBox, playerIcons, containerBox, controlBox, trackTiming } = styles;

    const { setLoadingTrack, loadingTrack, updateState, playbackState: {
        progress_ms,
        is_playing,
        item
    } = {} } = usePlayerContext();

    const {
        duration_ms,
        name,
        artists = [],
        album: {
            name: albumName,
            images: albumImages = []
        } = {}
    } = item || {};

    const albumArtUrl = albumImages.find(({ height, width }) => (height <= 300 && width <= 300))?.url || '';

    const togglePaused = () => {
        const apiCall = !paused ? pausePlayback : startPlayback;
        apiCall().then((response = {}) => {
            setPaused(prevState => !prevState);
        })
    };

    const handleSkipToNext = () => {
        setLoadingTrack(true);
        skipToNext().then((response = {}) => {
            setPosition(0);
        });
    };

    const handleSkipToPrevious = () => {
        setLoadingTrack(true);
        skipToPrevious().then((response = {}) => {
            setPosition(0);
        });
    }

    const handleSetPlayPosition = (_event, value) => {
        setPosition(value);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            setPlaybackPosition({ position_ms: value }).then((response = {}) => {
            });
        }, 1000);
    };

    const convertMsToTimeString = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');

        return `${minutes}:${seconds}`;
    }

    const updatePlaybackPosition = () => {
        setPosition((prevPosition => prevPosition + (paused ? 0 : 100)))
        playbackTimer.current = setTimeout(() => {
            updatePlaybackPosition();
        }, 100);
    };

    useEffect(() => {
        updateState();
    }, []);

    useEffect(() => {
        setPosition(progress_ms || 0);
        setPaused(!is_playing);
    }, [progress_ms, name]);

    useEffect(() => {
        playbackTimer.current = setTimeout(() => {
            updatePlaybackPosition();
        }, 100);

        if (position >= duration_ms) {
            setPosition(0);
            setLoadingTrack(true);
        }

        return () => clearTimeout(playbackTimer.current);
    }, [duration_ms, is_playing, progress_ms, paused]);

    return (
        <Box sx={containerBox}>
            <Box sx={trackInfoBox}>
                {loadingTrack ? (
                    <Skeleton variant="rectangular" width={150} height={150} sx={{ marginRight: '10px' }} />
                ) : (
                    <>
                        {albumArtUrl && <img src={albumArtUrl} alt={`Album: ${albumName}`} style={{ marginRight: 10 }} />}
                    </>
                )}
                <div className="track-details">
                    {loadingTrack ?
                        <>
                            <Skeleton variant="text" width={275} height={38} style={{ margin: ['20px', 0] }} />
                            <Skeleton variant="text" width={275} height={38} style={{ margin: ['20px', 0] }} />
                        </>
                        :
                        <>
                            <h1>{name}</h1>
                            <h2>{artists.map(({ name }) => name).join(', ')}</h2>
                        </>}
                </div>
            </Box>
            <Box sx={controlBox}>
                <IconButton onClick={handleSkipToPrevious} aria-label="previous song">
                    <FastRewindRounded sx={playerIcons} />
                </IconButton>
                <IconButton
                    aria-label={is_playing ? 'play' : 'pause'}
                    onClick={togglePaused}
                >
                    {paused ? (
                        <PlayArrowRounded sx={playerIcons} />
                    ) : (
                        <PauseRounded sx={playerIcons} />
                    )}
                </IconButton>
                <IconButton onClick={handleSkipToNext} aria-label="next song">
                    <FastForwardRounded sx={playerIcons} />
                </IconButton>
            </Box>
            <Slider
                aria-label="time-indicator"
                disabled={loadingTrack}
                size="small"
                value={position}
                min={0}
                step={1}
                sx={sliderStyles}
                max={duration_ms}
                onChange={handleSetPlayPosition}
            />
            <Box sx={trackTiming}>
                {!loadingTrack && <>
                    <span>{convertMsToTimeString(Math.min(position, duration_ms))}</span>
                    <span>-{convertMsToTimeString(Math.max(0, duration_ms - position))}</span>
                </>}
            </Box>
        </Box>
    );
}

export default PlayBackControl;
