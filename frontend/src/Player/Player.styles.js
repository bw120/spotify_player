const styles = {
    container: ({ palette }) => ({
        height: '100%',
        width: '100%',
        padding: '10px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& h2': {
            color: palette.text.secondary
        }
    })
};

export default styles;