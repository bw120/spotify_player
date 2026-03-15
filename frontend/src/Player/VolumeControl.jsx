import { useState, useEffect } from 'react'
import { IconButton, ClickAwayListener, Box, Card, Stack } from '@mui/material';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

import { setPlaybackVolume } from '../api/player';
import { usePlayerContext } from "./PlayerContext";
import usePlaybackEvents from "./PlaybackEvents";
import styles from './VolumeControl.styles';
import { SPOTIFY_EVENTS } from '../constants';

const { VOLUME_CHANGED } = SPOTIFY_EVENTS;
const VOLUME_STEP = 5;
const AUTO_CLOSE_TIMEOUT = 5000;

let closeTimer;

const VolumeControl = () => {
    const { buttonStyles, buttonOpenStyles, volumeControlBox, volumeControlItem, speedDial } = styles;
    const { updateState, playbackState: { device: { volume_percent } = {} } = {} } = usePlayerContext()
    const [volume, setVolume] = useState(10);
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen(prevState => !prevState);
    const closeVolumeControl = () => setOpen(false);
    const { messages } = usePlaybackEvents();
    const changeVolume = (newVolume) => {
        if (newVolume === volume) return;
        setVolume(newVolume);
        setPlaybackVolume(newVolume);
    };

    const increaseVolume = () => {
        changeVolume(Math.min(volume + VOLUME_STEP, 100));
    };

    const decreaseVolume = () => {
        changeVolume(Math.max(volume - VOLUME_STEP, 0));
    };

    const autoCloseTimer = () => setTimeout(() => {
        setOpen(false);
    }, AUTO_CLOSE_TIMEOUT);


    useEffect(() => {
        setVolume(volume_percent);
    }, [volume_percent]);

    useEffect(() => {
        clearTimeout(closeTimer);
        if (open) {
            closeTimer = autoCloseTimer();
        }
        return () => clearTimeout(closeTimer);
    }, [open]);

      useEffect(() => {
    if ([VOLUME_CHANGED].includes(messages?.at(-1)?.event)) {
       updateState()
    }
  }, [messages]);

    return (
        <ClickAwayListener onClickAway={closeVolumeControl}>
            <Box sx={speedDial}>
                <IconButton className={open && 'open'} sx={buttonStyles} color='default' onClick={toggleOpen}>
                    <VolumeUpRoundedIcon />
                </IconButton>
                {open &&
                    <Card sx={volumeControlBox}>
                        <Stack sx={volumeControlItem}>
                            <IconButton color='secondary' onClick={increaseVolume}>
                                <AddRoundedIcon fontSize='large' />
                            </IconButton>
                        </Stack>
                        <Stack sx={volumeControlItem}>
                            {volume}%
                        </Stack>
                        <Stack sx={volumeControlItem}>
                            <IconButton color='secondary' onClick={decreaseVolume}>
                                <RemoveRoundedIcon fontSize='large' />
                            </IconButton>
                        </Stack>
                    </Card>}
            </Box>
        </ClickAwayListener>
    )
};

export default VolumeControl;