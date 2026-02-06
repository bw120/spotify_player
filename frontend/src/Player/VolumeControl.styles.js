const styles = {
    volumeControlBox: {
        padding: '10px 10px',
        diplay: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    speedDial: {
        position: 'absolute',
        top: 20,
        right: 22,
        '& .MuiButtonBase-root': {
            width: '80px',
            height: '80px',
            '& svg': {
                width: '100%',
                height: '100%'
            }
        },
        '& .MuiSpeedDialIcon-root': {
            width: '50px',
            height: '50px',
            '& svg': {
                width: '100%',
                height: '100%'
            }
        }
    },
    volumeControlItem: {
        height: '55px',
        width: '60px',
        diplay: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '30px',
        fontWeight: 'bold',
    }
};

export default styles;