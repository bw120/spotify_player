import { useState, useEffect } from 'react'
import { IconButton, SpeedDial, SpeedDialIcon, Card, Stack } from '@mui/material';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

import { setPlaybackVolume } from '../api/player';
import { usePlayerContext } from "./PlayerContext";
import styles from './VolumeControl.styles';

const VOLUME_STEP = 5;

const VolumeControl = () => {
    const { volumeControlBox, volumeControlItem, speedDial } = styles;
    const { playbackState: { device: { volume_percent } = {} } = {} } = usePlayerContext()
    const [volume, setVolume] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    useEffect(() => {
        setVolume(volume_percent);
    }, [volume_percent]);

    return <div>
        <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            sx={speedDial}
            icon={<SpeedDialIcon icon={<VolumeUpRoundedIcon/>} />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction='down'
        >
            {open &&
                <Card sx={volumeControlBox}>
                    <Stack sx={volumeControlItem}>
                        <IconButton color='secondary' onClick={increaseVolume}>
                            <AddRoundedIcon fontSize='large'/>
                        </IconButton>
                    </Stack>
                    <Stack sx={volumeControlItem}>
                        {volume}%
                    </Stack>
                    <Stack sx={volumeControlItem}>
                        <IconButton color='secondary' onClick={decreaseVolume}>
                            <RemoveRoundedIcon fontSize='large'/>
                        </IconButton>
                    </Stack>
                </Card>}
        </SpeedDial></div>
};

export default VolumeControl;