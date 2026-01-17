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

const ListComponent = ({ items = [], total, itemsPerPage = 5, currentPage = 1, onPageChange }) => {
    const { setSelectedScreen } = useAppContext();
    const { setLoadingTrack } = usePlayerContext();

    const handleListItemClick = async (event, { type, id, uri }) => {
        await transferPlaybackToDevice();
        await startPlayback({ uri });
        setLoadingTrack(true)
        setSelectedScreen(APP_SCREENS.PLAYER);
    }

    const handlePaginationChange = (event, value) => {
        onPageChange(value);
    };

    return (<div>
        <Stack spacing={2}><List sx={{ width: '100%' }}>
            {items.map(({ name, description, avatar, type, id, uri }, index) => (
                <>
                    <ListItem key={`${name}-${description}`} alignItems="flex-start">
                        <ListItemButton
                            onClick={(event) => handleListItemClick(event, { type, id, uri })}
                        >
                            <ListItemAvatar>
                                <Avatar alt={name} src={avatar?.at(-1)?.url} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={name}
                                secondary={description &&
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        sx={{ color: 'text.primary', display: 'inline' }}
                                    >
                                        {description}
                                    </Typography>

                                }
                            />
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </>
            ))}

        </List>
        </Stack>
        <Stack spacing={2}>
            <Pagination count={Math.ceil(total / itemsPerPage)} onChange={handlePaginationChange} variant="outlined" shape="rounded" />
        </Stack>
    </div>
    )
};

export default ListComponent;