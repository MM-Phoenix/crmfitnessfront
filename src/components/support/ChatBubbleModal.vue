<template>
  <!-- Floating button -->
  <button class="chat-fab" @click="toggle">
    💬
  </button>

  <!-- Chat Modal -->
  <transition name="fade">
    <div v-if="open" class="overlay" @click.self="close">
      <transition name="scale">
        <div class="modal">
          <header class="modal-header">
            <h2>Support Chat</h2>
            <button class="close-btn" @click="close">✕</button>
          </header>

          <div class="messages" ref="messagesBox">
            <div
                v-for="(m, i) in messages"
                :key="i"
                :class="['message', m.from]"
            >
              <div class="bubble">{{ m.text }}</div>
            </div>
          </div>

          <form class="composer" @submit.prevent="send">
            <input
                v-model="draft"
                class="input"
                type="text"
                placeholder="Type a message..."
            />
            <button class="send-btn" type="submit">Send</button>
          </form>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import Constants from "@/api/Constants";
import WebSocketAPI from "@/api/WebSocketAPI";

const open = ref(false);
const draft = ref("");
const messages = ref([
  { from: "bot", text: "👋 Hello! How can I help you today?" },
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

  messages.value.push({ from: "user", text });
  draft.value = "";
  scrollToBottom();

  try {
    const res = await axios.get(Constants.SUPPORT_URL + "message", {
      params: { text },
      responseType: "text",
    });

    messages.value.push({ from: "bot", text: res.data });
  } catch (e) {
    messages.value.push({ from: "bot", text: "⚠️ Server error." });
  } finally {
    scrollToBottom();
  }
}

onMounted(() => {
  console.log("Web socket starting...")
  wsClient = WebSocketAPI;
  wsClient.connectWebSocket((body) => {
    messages.value.push({ from: "bot", text: body });
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
  width: 320px;
  height: 420px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* centers horizontally & vertically */
  background: #fff;
  border-radius: 10px;
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
.message.user {
  justify-content: flex-end;
}
.message.bot {
  justify-content: flex-start;
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
