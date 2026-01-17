const styles = {
    containerBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        color: '#fff'
    },
    trackInfoBox: {
        width: '90%',
        paddgin: '10px',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& img': {
            height: 150
        }

    },
    controlBox: {
        margin: '20px 0',
    },
    sliderStyles: (t) => ({
        color: 'rgba(255, 77, 0, 0.87)',
        height: 12,
        width: '90%',
        '& .MuiSlider-thumb': {
            width: 20,
            height: 20,
            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
            '&::before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
            },
            '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${'rgb(0 0 0 / 16%)'}`,
                ...t.applyStyles('dark', {
                    boxShadow: `0px 0px 0px 8px ${'rgb(255 255 255 / 16%)'}`,
                }),
            },
            '&.Mui-active': {
                width: 25,
                height: 25,
            },
        },
        '& .MuiSlider-rail': {
            opacity: 0.30,
        }
    }),
    playerIcons: {
        fontSize: '90px',
        color: 'rgba(255, 77, 1, 0.87)',
    },
    trackTiming: {
        height: 24,
        width: '90%',
        display: 'flex',
        justifyContent: 'space-between'
    }
};

export default styles;