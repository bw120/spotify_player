const styles = {
    containerBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        color: '#fff',
        padding: '5px 0',
    },
    trackInfoBox: ({ palette }) => ({
        width: '90%',
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& img': {
            height: 185,
            marginBottom: '5px'
        },
        '& .track-details': {
            textAlign: 'center',
            maxWidth: '100%',
            '& h1, & h2': {
                lineHeight: 1.2,
                display: 'block',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
            },
            '& h1': {
                color: palette.text.primary
            },
            '& h2': {
                color: palette.text.secondary
            }
        }

    }),
    controlBox: {
        margin: '0',
        display: 'flex',
        alignItems: 'center',
        '& button': {
            padding: 0
        }
    },
    sliderStyles: ({ palette, applyStyles }) => ({
        color: palette.primary.light,
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
                boxShadow: `0px 0px 0px 8px ${'rgb(0 0 0 / 16%)'}`
            },
            '&.Mui-active': {
                width: 25,
                height: 25,
            },
        },
        '& .MuiSlider-rail': {
            opacity: 0.30,
        },
        '&.MuiSlider-root': {
            padding: '10px 0'
        }
    }),
    playerIcons: ({ palette }) => ({
        fontSize: '90px',
        color: palette.secondary.main,
    }),
    trackTiming: {
        height: 24,
        width: '90%',
        display: 'flex',
        justifyContent: 'space-between'
    }
};

export default styles;