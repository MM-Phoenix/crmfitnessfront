<template>
  <!-- Floating button -->
  <button class="chat-fab" @click="toggle">
    💬
  </button>

  <!-- Chat Modal -->
  <transition name="fade">
    <div v-if="open" class="overlay" @click.self="close">
      <transition name="scale">
        <div class="modal w3-responsive w3-card-4 col-md-12">
          <header class="modal-header">
            <h3>Support Chat</h3>
            <button class="close-btn w3-button w3-hover-opacity-off button-learn-more" @click="close">✕</button>
          </header>

          <div class="messages" ref="messagesBox">
            <div
                v-for="(m, i) in messages"
                :key="i"
                :class="['message', m.from === 'Me' ? 'me' : 'other']"
            >
              <div class="bubble">
                <span v-if="m.from !== 'Me'">{{ m.from }}: </span>
                {{ m.text }}
              </div>
            </div>
          </div>

          <form class="composer" @submit.prevent="send">
            <input
                v-model="draft"
                class="w3-input w3-border"
                type="text"
                placeholder="Type a message..."
            />
            <button class="w3-button w3-hover-opacity-off button-learn-more" type="submit">Send</button>
          </form>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import {computed, nextTick, onBeforeUnmount, onMounted, ref} from "vue";
import axios from "axios";
import Constants from "@/api/Constants";
import WebSocketAPI from "@/api/WebSocketAPI";
import {useStore} from "vuex";
import authHeader from '../../store/authHeader';

const store = useStore();
const currentUser = computed(() => store.state.auth.user);

const open = ref(false);
const draft = ref("");
let isFirstMessage = ref(true);
const messages = ref([
  {
    from: "Assistant",
    text: computed(() => {
      if (currentUser.value) {
        const role = currentUser.value.role || "";
        const name = currentUser.value.firstName;

        if (role.includes("OWNER")) {
          isFirstMessage.value = false;
          return "👋 Hello, Owner " + name + "! Let's answer for some dump questions.";
        }
        if (role.includes("ADMIN")) {
          isFirstMessage.value = false;
          return "👋 Hello, Admin " + name + "! Let's answer for some dump questions.";
        }
        if (role.includes("TRAINER")){
          isFirstMessage.value = false;
          return "👋 Hello, Trainer " + name + "! Let's answer for some dump questions.";
        }
        if (role.includes("CLIENT")) return "👋 Hello, " + name + "! How can I help you today?";
      }

      return "👋 Hello! How can I help you today?";
    }),
  },
]);
const messagesBox = ref(null);
let wsClient = null;

function toggle() {
  open.value = !open.value;
  if (open.value) {
    nextTick(() => scrollToBottom());
  }
}

function close() {
  open.value = false;
}

function scrollToBottom() {
  nextTick(() => {
    const el = messagesBox.value;
    if (el) el.scrollTop = el.scrollHeight;
  });
}

async function send() {
  const text = draft.value.trim();
  if (!text) return;

  messages.value.push({from: "Me", text});
  draft.value = "";
  scrollToBottom();

  try {
    if (isFirstMessage.value) {
      isFirstMessage.value = false;

      const res = await axios.get(Constants.SUPPORT_URL + "message", {
        params: {text},
        responseType: "text",
      });
      messages.value.push({from: "Assistant", text: res.data});
    }

    if (wsClient && wsClient.stompClient) {
      console.log("send by websocket");

      wsClient.stompClient.publish({
        destination: "/app/chat/send",
        headers: authHeader(),
        body: JSON.stringify({
          fromWho: "Client",
          content: text
        })
      });
    }

  } catch (e) {
    messages.value.push({from: "Assistant", text: "⚠️ Server error."});
  } finally {
    scrollToBottom();
  }
}

onMounted(() => {
  console.log("Web socket starting...")
  wsClient = WebSocketAPI;
  wsClient.connectWebSocket(() => {
  }, () => {
  }, (body) => {
    isFirstMessage.value = false;
    const messageBody = JSON.parse(body);
    messages.value.push({from: messageBody.fromWho, text: messageBody.content});
    scrollToBottom();
  });
});

onBeforeUnmount(() => {
  if (wsClient) wsClient.disconnect();
});
</script>

<style scoped>
/* Floating button */
.chat-fab {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: dodgerblue;
  color: white;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
}

/* Overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Modal */
.modal {
  padding: 10px 5px;
  width: 500px;
  height: 420px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* centers horizontally & vertically */
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

/* Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid #eee;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

/* Messages */
.messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message {
  display: flex;
}

.message.me {
  justify-content: flex-end;
}

.message.me > div {
  background: #e0f0f6;
}

.message.other {
  justify-content: flex-start;
}

.message.other > div {
  background: #c9e3ee;
}

.bubble {
  padding: 8px 12px;
  border-radius: 12px;
  max-width: 75%;
  font-size: 14px;
}

.message.user .bubble {
  background: dodgerblue;
  color: white;
  border-bottom-right-radius: 4px;
}

.message.bot .bubble {
  background: #f1f1f1;
  color: #222;
  border-bottom-left-radius: 4px;
}

/* Composer */
.composer {
  display: flex;
  gap: 6px;
  padding: 8px;
  border-top: 1px solid #eee;
}

.input {
  flex: 1;
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.send-btn {
  background: dodgerblue;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active {
  transition: transform 0.2s, opacity 0.2s;
}

.scale-enter-from {
  transform: scale(0.95);
  opacity: 0;
}

.scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>
