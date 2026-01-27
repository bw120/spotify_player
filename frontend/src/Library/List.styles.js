import { justifyContent } from "@mui/system";

const styles = {
    listContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        display: 'flex',
        flexDirection: 'column',
    },
    fullWidth: {
        width: '100%',
        height: '100%'
    },
    list: {
        width: '50%'
    },
    listItem: {
        maxWidth: 250,
        '& span': {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
        }
    },
    paginationContainer: {
        justifyContent: "flex-end",
        alignItems: "center",
    }
};

export default styles;