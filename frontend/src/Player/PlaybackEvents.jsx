import { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const WEBSOCKET_URL = process.env.REACT_APP_SPOTIFY_WEBSOCKET_URL;

const usePlaybackEvents = () => {
    const [messageHistory, setMessageHistory] = useState([]);
    const { sendMessage, lastMessage, readyState } = useWebSocket(WEBSOCKET_URL, {
        shouldReconnect: (closeEvent) => true,
        reconnectInterval: 3000,
    });


    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev) => prev.concat(JSON.parse(lastMessage?.data) || {}))
        }
    }, [lastMessage]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return { messages: messageHistory, sendMessage, connectionStatus: connectionStatus[readyState] }
}

export default usePlaybackEvents;

