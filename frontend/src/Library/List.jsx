import { Fragment } from 'react';
import List from '@mui/material/List';
import {
    ListItem,
    Divider,
    ListItemButton,
    Stack,
    ListItemText,
    ListItemAvatar,
    Pagination,
    Avatar,
    Typography
} from '@mui/material';

import { startPlayback, transferPlaybackToDevice } from '../api/player';
import { APP_SCREENS } from "../constants";
import { useAppContext } from "../AppContext";
import { usePlayerContext } from "../Player/PlayerContext";
import styles from './List.styles';

const createPlaybackParameters = (type, uri) => {
    if (type === 'artist') {
        return { context_uri: uri };
    }

    if (type === 'playlist' || type === 'album') {
        return { context_uri: uri, offset: { position: 0 } };
    }

    if (type === 'track') {
        return { uris: [uri], position_ms: 0 };
    }

}

const ListComponent = ({ items = [], total, itemsPerPage = 10, currentPage = 1, onPageChange }) => {
    const { setSelectedScreen } = useAppContext();
    const { setLoadingTrack } = usePlayerContext();
    const { list, listContainer, listItem, fullWidth, paginationContainer } = styles;

    const handleListItemClick = async (event, { type, id, uri }) => {
        await transferPlaybackToDevice();
        const params = createPlaybackParameters(type, uri);
        await startPlayback(params);
        setLoadingTrack(true)
        setSelectedScreen(APP_SCREENS.PLAYER);
    }

    const handlePaginationChange = (event, value) => {
        onPageChange(value);
    };
    const middleIndex = items.length % 2 === 0 ? Math.floor(items.length / 2) : Math.ceil(items.length / 2);
    const firstHalfList = items.slice(0, middleIndex);
    const secondHalfList = items.slice(middleIndex);

    return (<div style={listContainer}>
        <Stack sx={fullWidth} direction="row" spacing={2} justifyContent="space-between">
            <List dense sx={list}>
                {firstHalfList.map(({ name, avatar, type, id, uri }, index) => (
                    <Fragment key={id}>
                        <ListItem divider>
                            <ListItemButton
                                component="button"
                                onClick={(event) => handleListItemClick(event, { type, id, uri })}
                            >
                                <ListItemAvatar>
                                    <Avatar alt={name} src={avatar?.at(-1)?.url} />
                                </ListItemAvatar>
                                <ListItemText
                                    sx={listItem}
                                    primary={name}
                                />
                            </ListItemButton>
                        </ListItem>
                    </Fragment>
                ))}
            </List>
            <List dense sx={list}>
                {secondHalfList.map(({ name, avatar, type, id, uri }, index) => (
                    <Fragment key={id}>
                        <ListItem divider>
                            <ListItemButton
                                component="button"
                                onClick={(event) => handleListItemClick(event, { type, id, uri })}
                            >
                                <ListItemAvatar>
                                    <Avatar alt={name} src={avatar?.at(-1)?.url} />
                                </ListItemAvatar>
                                <ListItemText
                                    sx={listItem}
                                    primary={name}
                                />
                            </ListItemButton>
                        </ListItem>
                    </Fragment>
                ))}
            </List>
        </Stack>
        <Stack sx={paginationContainer}>
            {items.length > 0 && <Pagination count={Math.ceil(total / itemsPerPage)} onChange={handlePaginationChange} variant="outlined" shape="rounded" />}
        </Stack>
    </div>
    )
};

export default ListComponent;