import authHeader from '../store/authHeader';
import Constants from "@/api/Constants";

const {Client} = window.StompJs;

class WebSocketAPI {

    async connectWebSocket({onConnected, onDisconnected, onMessage}) {
        console.log('Header', authHeader());
        const stompClient = new Client({
            webSocketFactory: () => new WebSocket(Constants.WEB_SOCKET_URL),
            reconnectDelay: 5000,
            connectHeaders: authHeader(),
            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000,
            debug: str => console.log('%c[STOMP DEBUG]', 'color: teal', str),

            onConnect: () => {
                console.log('STOMP connected');
                if (onConnected) onConnected();

                const channel = '/user/queue/NotificationAddedCastV1';
                stompClient.subscribe(channel, (message) => {
                    console.log('Message received:', message.body);
                    if (onMessage) onMessage(message.body);
                }, authHeader());
            },

            onDisconnect: () => {
                console.warn('STOMP disconnected');
                if (onDisconnected) onDisconnected();
            },

            onStompError: (frame) => {
                console.error('STOMP error:', frame.headers['message']);
            }
        });

        stompClient.activate();
    }
}

export default new WebSocketAPI();