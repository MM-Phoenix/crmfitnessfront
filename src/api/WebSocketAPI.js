import authHeader from '../store/authHeader';
import Constants from "@/api/Constants";

const {Client} = window.StompJs;

class WebSocketAPI {

    stompClient = null;

    async connectWebSocket(onConnected, onDisconnected, onMessage) {
        let uuid = crypto.randomUUID();
        const headers = authHeader();
        headers.urlPath = uuid;

        const stompClient = new Client({
            webSocketFactory: () => new WebSocket(Constants.WEB_SOCKET_URL),
            reconnectDelay: 20000,
            connectHeaders: headers,
            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000,
            debug: (str) => console.log('[STOMP DEBUG]', str),

            onConnect: (frame) => {
                console.log("STOMP connected", frame.headers);

                const channel = "/queue/" + uuid + "/messages";

                stompClient.subscribe(
                    channel,
                    (message) => {
                        console.log("Received: ", message);

                        const messageBody = JSON.parse(message.body);
                        console.log("From:", messageBody.fromWho);
                        console.log("Content:", messageBody.content);

                        if (onMessage) onMessage(message.body);
                    },
                    headers
                );

                if (onConnected) onConnected();
            },

            onDisconnect: () => {
                if (onDisconnected) onDisconnected();
            },

            onStompError: (frame) => {
                console.error("STOMP error:", frame.headers["message"]);
            }
        });

        this.stompClient = stompClient;

        stompClient.activate();
    }

    disconnect() {
        if (this.stompClient) {
            this.stompClient.deactivate();
            this.stompClient = null;
        }
    }
}


export default new WebSocketAPI();