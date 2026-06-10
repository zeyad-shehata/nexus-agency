// ============================================
// NEXUS AGENCY — Live Chat Widget
// ============================================

import {
  getMessages,
  sendMessage,
  CHAT_EVENT,
  CHAT_TYPING_EVENT,
  CHAT_STATUS_EVENT,
  getConversationStatus,
  setConversationStatus,
  resetUnreadCount,
  getUnreadCount,
  incrementUnreadCount
} from '../utils/chat-state.js';

let isOpen = false;
let isAdminOpen = false;
let isTyping = false;
let isSending = false;
let audioContext: any = null;
let serverMessages: any[] = [];

// Simple Web Audio API sound generator for premium sound notifications
function playBeep(frequency = 600, type = 'sine', duration = 0.15) {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gain.gain.setValueAtTime(0.08, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + duration);
  } catch (e) {
    // Audio context not allowed or unsupported
  }
}

// Simple HTML Sanitizer to prevent XSS
function sanitizeHTML(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

// Format timestamp
function formatTime(isoString) {
  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

const COMMON_EMOJIS = ['😊', '👍', '🔥', '🚀', '🙌', '💡', '✨', '💻', '🎨', '💼', '👏', '🎉'];

export function initChatWidget() {
  // Prevent duplicate rendering
  if (document.getElementById('nexus-chat-widget')) return;

  // Append styles dynamically
  const styleLink = document.createElement('link');
  styleLink.rel = 'stylesheet';
  styleLink.href = '/src/styles/chat-widget.css';
  document.head.appendChild(styleLink);

  const container = document.createElement('div');
  container.id = 'nexus-chat-widget';
  container.className = 'nexus-chat-widget';

  container.innerHTML = `
    <!-- Floating Admin Toggle -->
    <button id="admin-sim-fab" class="admin-sim-fab" title="Open Admin Simulator Console" aria-label="Open Admin Simulator Console">
      <span class="admin-sim-badge" id="admin-sim-badge" style="display: none;">0</span>
      🛠️ Admin
    </button>

    <!-- Floating Client Button -->
    <button id="chat-fab" class="chat-fab" aria-label="Open support chat">
      <span class="chat-badge" id="chat-fab-badge" style="display: none;">0</span>
      <svg class="chat-icon-msg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <svg class="chat-icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <!-- Chat Window (Client View) -->
    <div id="chat-window" class="chat-window">
      <!-- Header -->
      <div class="chat-header">
        <div class="chat-avatar">NC</div>
        <div class="chat-header-info">
          <div class="chat-title">Nexus Concierge</div>
          <div class="chat-status">
            <span class="status-dot online"></span>
            <span id="chat-status-text">Status: Open</span>
          </div>
        </div>
        <button id="chat-close-btn" class="chat-header-close" aria-label="Minimize chat">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 15l-6-6-6 6"></path>
          </svg>
        </button>
      </div>

      <!-- Messages Area -->
      <div class="chat-messages" id="chat-messages-container">
        <!-- Message list will render here -->
      </div>

      <!-- Typing Indicator -->
      <div class="chat-typing-indicator" id="chat-typing" style="display: none;">
        <span></span><span></span><span></span>
      </div>

      <!-- Error Overlay / Alert -->
      <div class="chat-error-alert" id="chat-error" style="display: none;"></div>

      <!-- Form Area -->
      <form id="chat-input-form" class="chat-input-form">
        <!-- Emoji Picker Panel -->
        <div id="emoji-picker" class="emoji-picker" style="display: none;">
          <div class="emoji-grid">
            ${COMMON_EMOJIS.map(e => `<button type="button" class="emoji-btn" data-emoji="${e}">${e}</button>`).join('')}
          </div>
        </div>

        <div class="chat-input-wrapper">
          <!-- Attachment Button -->
          <button type="button" id="chat-attach-btn" class="chat-action-btn" aria-label="Attach file">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
            </svg>
          </button>
          <input type="file" id="chat-file-input" style="display: none;" accept="image/*,.pdf,.zip" />

          <!-- Text Input -->
          <textarea id="chat-text-input" class="chat-textarea" placeholder="Type a message..." rows="1"></textarea>

          <!-- Emoji Toggle -->
          <button type="button" id="chat-emoji-btn" class="chat-action-btn" aria-label="Insert emoji">
            😊
          </button>

          <!-- Send Button -->
          <button type="submit" id="chat-send-btn" class="chat-send-btn" disabled aria-label="Send message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </form>
    </div>

    <!-- Admin Console Window (Simulator Mode) -->
    <div id="admin-window" class="admin-window">
      <!-- Admin Header -->
      <div class="admin-header">
        <div class="admin-avatar">ADM</div>
        <div class="admin-header-info">
          <div class="admin-title">Nexus Agent Simulator</div>
          <div style="font-size: 11px; opacity: 0.8;">Real-Time Control Panel</div>
        </div>
        <button id="admin-close-btn" class="admin-header-close" aria-label="Close Admin View">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Control Settings Pane -->
      <div class="admin-controls">
        <div class="control-row">
          <label class="control-label">Status:</label>
          <select id="admin-status-select" class="admin-select">
            <option value="Open">Open</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div class="control-row">
          <label class="control-label" style="display:flex;align-items:center;gap:6px;cursor:pointer;">
            <input type="checkbox" id="admin-typing-chk" />
            <span>Simulate Typing State</span>
          </label>
        </div>
      </div>

      <!-- Admin Messages History -->
      <div class="admin-messages" id="admin-messages-container">
        <!-- Message list from Admin view -->
      </div>

      <!-- Admin Input Form -->
      <form id="admin-input-form" class="admin-input-form">
        <div class="chat-input-wrapper">
          <textarea id="admin-text-input" class="chat-textarea" placeholder="Reply as admin..." rows="1"></textarea>
          <button type="submit" id="admin-send-btn" class="chat-send-btn" disabled aria-label="Send reply">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(container);

  // Cache element references
  const fab = document.getElementById('chat-fab')!;
  const fabMsgIcon = fab.querySelector('.chat-icon-msg') as HTMLElement;
  const fabCloseIcon = fab.querySelector('.chat-icon-close') as HTMLElement;
  const chatWin = document.getElementById('chat-window')!;
  const closeBtn = document.getElementById('chat-close-btn')!;
  const form = document.getElementById('chat-input-form') as HTMLFormElement;
  const textInput = document.getElementById('chat-text-input') as HTMLTextAreaElement;
  const sendBtn = document.getElementById('chat-send-btn') as HTMLButtonElement;
  const emojiBtn = document.getElementById('chat-emoji-btn')!;
  const emojiPicker = document.getElementById('emoji-picker')!;
  const attachBtn = document.getElementById('chat-attach-btn')!;
  const fileInput = document.getElementById('chat-file-input') as HTMLInputElement;
  const typingIndicator = document.getElementById('chat-typing')!;
  const badge = document.getElementById('chat-fab-badge')!;

  // Admin element references
  const adminFab = document.getElementById('admin-sim-fab')!;
  const adminWin = document.getElementById('admin-window')!;
  const adminClose = document.getElementById('admin-close-btn')!;
  const adminForm = document.getElementById('admin-input-form') as HTMLFormElement;
  const adminTextInput = document.getElementById('admin-text-input') as HTMLTextAreaElement;
  const adminSendBtn = document.getElementById('admin-send-btn') as HTMLButtonElement;
  const adminStatusSelect = document.getElementById('admin-status-select') as HTMLSelectElement;
  const adminTypingChk = document.getElementById('admin-typing-chk') as HTMLInputElement;
  const adminBadge = document.getElementById('admin-sim-badge')!;

  // Backend Integration State Variables
  const userToken = localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const API_BASE = 'http://localhost:5000/api/v1';
  let activeConversationId: string | null = null;
  serverMessages = [];
  let clientSocket: any = null;
  let clientTypingTimeout: ReturnType<typeof setTimeout> | null = null;

  // Hide admin simulator FAB if logged in as a normal or admin user
  if (userToken) {
    if (adminFab) adminFab.style.display = 'none';
  }

  // ----------------------------------------------------
  // REAL-TIME INTEGRATED FUNCTIONS (For Logged-in Users)
  // ----------------------------------------------------
  async function initRealTimeChat() {
    if (!userToken || !user) return;
    
    // Load Socket.io script dynamically if needed
    if (typeof (window as any).io === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.socket.io/4.7.5/socket.io.min.js';
      script.onload = () => setupClientSocket();
      document.head.appendChild(script);
    } else {
      setupClientSocket();
    }

    try {
      // Get conversations list from server
      const res = await fetch(`${API_BASE}/chat/conversations`, {
        headers: { 'Authorization': `Bearer ${userToken}` }
      });
      const conversations = await res.json();
      
      let conv = conversations[0];
      if (!conv) {
        // Create initial Support Conversation
        const createRes = await fetch(`${API_BASE}/chat/conversation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          },
          body: JSON.stringify({})
        });
        conv = await createRes.json();
      }

      if (conv) {
        activeConversationId = conv.id;
        if (clientSocket) {
          clientSocket.emit('join_conversation', { conversationId: conv.id });
        }
        await loadServerMessages(conv.id);
      }
    } catch (err) {
      console.error('Failed to init real-time client chat:', err);
    }
  }

  async function loadServerMessages(convId) {
    try {
      const res = await fetch(`${API_BASE}/chat/${convId}`, {
        headers: { 'Authorization': `Bearer ${userToken}` }
      });
      serverMessages = await res.json();
      renderMessagesList();
    } catch (err) {
      console.error('Failed to load messages from server:', err);
    }
  }

  function setupClientSocket() {
    if (clientSocket) return;

    clientSocket = (window as any).io('http://localhost:5000', {
      auth: { token: userToken }
    });

    clientSocket.on('connect', () => {
      console.log('⚡ Client connected to support socket.');
      if (activeConversationId) {
        clientSocket.emit('join_conversation', { conversationId: activeConversationId });
      }
    });

    clientSocket.on('message_received', (msg) => {
      if (msg.conversationId === activeConversationId) {
        // Check duplicate
        if (!serverMessages.find(m => m.id === msg.id)) {
          serverMessages.push(msg);
          renderMessagesList();
          playBeep(640, 'sine', 0.15); // play support reply sound
          
          if (!isOpen) {
            incrementUnreadCount();
            updateBadge();
          } else {
            // Send read receipt back instantly
            clientSocket.emit('message_read', { conversationId: activeConversationId, messageId: msg.id });
          }
        }
      }
    });

    clientSocket.on('user_typing', ({ conversationId, typing, userId }) => {
      if (conversationId === activeConversationId && userId !== user.id) {
        typingIndicator.style.display = typing ? 'flex' : 'none';
        scrollToBottom();
      }
    });

    clientSocket.on('message_read_receipt', ({ conversationId, messageId, userId }) => {
      if (conversationId === activeConversationId && userId !== user.id) {
        serverMessages.forEach(m => {
          if (m.senderId === user.id) {
            m.seen = true;
          }
        });
        renderMessagesList();
      }
    });

    clientSocket.on('disconnect', () => {
      console.log('🔌 Client socket disconnected.');
    });
  }

  function emitClientTypingState() {
    if (!clientSocket || !activeConversationId) return;
    if (clientTypingTimeout) clearTimeout(clientTypingTimeout);

    clientSocket.emit('typing_state', { conversationId: activeConversationId, typing: true });

    clientTypingTimeout = setTimeout(() => {
      clientSocket.emit('typing_state', { conversationId: activeConversationId, typing: false });
    }, 2000);
  }

  // ----------------------------------------------------
  // General UI Toggles & Core Handlers
  // ----------------------------------------------------
  const toggleChat = async () => {
    isOpen = !isOpen;
    if (isOpen) {
      chatWin.classList.add('open');
      fabMsgIcon.style.display = 'none';
      fabCloseIcon.style.display = 'block';
      resetUnreadCount();
      updateBadge();
      
      if (userToken) {
        await loadServerMessages(activeConversationId);
        if (clientSocket && activeConversationId) {
          clientSocket.emit('message_read', { conversationId: activeConversationId });
        }
      } else {
        renderMessagesList();
      }
      setTimeout(() => textInput.focus(), 300);
      playBeep(800, 'sine', 0.08); // high tick
    } else {
      chatWin.classList.remove('open');
      fabMsgIcon.style.display = 'block';
      fabCloseIcon.style.display = 'none';
      emojiPicker.style.display = 'none';
      if (clientSocket && activeConversationId) {
        clientSocket.emit('typing_state', { conversationId: activeConversationId, typing: false });
      }
    }
  };

  const toggleAdmin = () => {
    isAdminOpen = !isAdminOpen;
    if (isAdminOpen) {
      adminWin.classList.add('open');
      adminFab.classList.add('active');
      renderAdminMessages();
      adminBadge.style.display = 'none';
      adminBadge.textContent = '0';
      setTimeout(() => adminTextInput.focus(), 300);
      playBeep(450, 'sine', 0.1); // lower pulse
    } else {
      adminWin.classList.remove('open');
      adminFab.classList.remove('active');
    }
  };

  fab.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);
  adminFab.addEventListener('click', toggleAdmin);
  adminClose.addEventListener('click', toggleAdmin);

  // Status updates (Mock mode only)
  adminStatusSelect.addEventListener('change', (e) => {
    setConversationStatus((e.target as HTMLSelectElement).value);
  });

  // Typing state (Mock mode only)
  adminTypingChk.addEventListener('change', (e) => {
    window.dispatchEvent(new CustomEvent(CHAT_TYPING_EVENT, { detail: { typing: (e.target as HTMLInputElement).checked } }));
  });

  // Textarea input adjustments
  textInput.addEventListener('input', () => {
    const hasValue = textInput.value.trim().length > 0;
    sendBtn.disabled = !hasValue || isSending;
    textInput.style.height = 'auto';
    textInput.style.height = `${Math.min(textInput.scrollHeight, 120)}px`;
    
    if (userToken && activeConversationId) {
      emitClientTypingState();
    }
  });

  textInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!sendBtn.disabled) form.requestSubmit();
    }
  });

  // Form Submit Handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = textInput.value.trim();
    if (!text || isSending) return;

    isSending = true;
    sendBtn.disabled = true;
    textInput.disabled = true;

    try {
      if (text.toLowerCase().includes('spam') || text.toLowerCase().includes('abuse')) {
        throw new Error('Message flagged by spam protection.');
      }

      if (userToken) {
        // Send real message to server
        const res = await fetch(`${API_BASE}/chat/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          },
          body: JSON.stringify({
            conversationId: activeConversationId,
            message: text
          })
        });
        const newMsg = await res.json();
        if (!res.ok) throw new Error(newMsg.error || 'Failed to send message.');

        serverMessages.push(newMsg);
        renderMessagesList();
        
        if (clientSocket) {
          clientSocket.emit('typing_state', { conversationId: activeConversationId, typing: false });
        }
      } else {
        // Mock flow fallback
        sendMessage(text, 'text', 'user');
      }

      textInput.value = '';
      textInput.style.height = 'auto';
      clearError();
    } catch (err) {
      showError(err.message || 'Failed to send message.');
    } finally {
      isSending = false;
      textInput.disabled = false;
      sendBtn.disabled = true;
      textInput.focus();
    }
  });

  // Admin Simulator Submit (Mock mode only)
  adminTextInput.addEventListener('input', () => {
    adminSendBtn.disabled = adminTextInput.value.trim().length === 0;
    adminTextInput.style.height = 'auto';
    adminTextInput.style.height = `${Math.min(adminTextInput.scrollHeight, 120)}px`;
  });

  adminTextInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!adminSendBtn.disabled) adminForm.requestSubmit();
    }
  });

  adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = adminTextInput.value.trim();
    if (!text) return;

    sendMessage(text, 'text', 'admin');
    
    if (adminTypingChk.checked) {
      adminTypingChk.checked = false;
      window.dispatchEvent(new CustomEvent(CHAT_TYPING_EVENT, { detail: { typing: false } }));
    }

    adminTextInput.value = '';
    adminTextInput.style.height = 'auto';
    adminSendBtn.disabled = true;
    adminTextInput.focus();
  });

  // Emoji picker attachment
  emojiBtn.addEventListener('click', () => {
    emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
  });

  emojiPicker.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.emoji-btn') as HTMLElement;
    if (btn) {
      textInput.value += btn.dataset.emoji || '';
      textInput.dispatchEvent(new Event('input'));
      emojiPicker.style.display = 'none';
      textInput.focus();
    }
  });

  // Attachment uploading
  attachBtn.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    if (!file) return;

    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      showError('File exceeds 10MB limit.');
      fileInput.value = '';
      return;
    }

    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'zip', 'docx'];
    const extension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      showError('Format not supported. Upload image, PDF, DOCX, or ZIP.');
      fileInput.value = '';
      return;
    }

    isSending = true;
    textInput.disabled = true;
    sendBtn.disabled = true;
    showError('Uploading attachment...', 'info');

    try {
      if (userToken) {
        const formData = new FormData();
        formData.append('file', file);

        const uploadRes = await fetch(`${API_BASE}/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${userToken}`
          },
          body: formData
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || 'Upload failed.');

        const res = await fetch(`${API_BASE}/chat/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          },
          body: JSON.stringify({
            conversationId: activeConversationId,
            message: file.name,
            attachmentUrl: uploadData.url
          })
        });
        const newMsg = await res.json();
        if (!res.ok) throw new Error(newMsg.error || 'Failed to send message.');

        serverMessages.push(newMsg);
        renderMessagesList();
        clearError();
      } else {
        // Mock fallback flow
        await new Promise(resolve => setTimeout(resolve, 1200));
        const fileUrl = URL.createObjectURL(file);
        sendMessage(file.name, 'file', 'user', {
          name: file.name,
          size: (file.size / 1024).toFixed(1) + ' KB',
          url: fileUrl,
          isImage: file.type.startsWith('image/')
        });
        clearError();
      }
    } catch (err) {
      showError(err.message || 'Failed to upload file.');
    } finally {
      isSending = false;
      textInput.disabled = false;
      fileInput.value = '';
      textInput.focus();
    }
  });

  // State update handlers (For Local Simulator mode only)
  window.addEventListener(CHAT_EVENT, ((e: CustomEvent) => {
    if (userToken) return;
    const msg = e.detail;

    renderMessagesList();
    renderAdminMessages();

    if (msg.sender === 'user') {
      playBeep(520, 'triangle', 0.12); // user beep
      if (!isAdminOpen) {
        const currentCount = parseInt(adminBadge.textContent || '0', 10);
        adminBadge.textContent = (currentCount + 1).toString();
        adminBadge.style.display = 'flex';
      }
    } else if (msg.sender === 'admin') {
      playBeep(640, 'sine', 0.15); // admin beep
      if (!isOpen) {
        updateBadge();
      } else {
        resetUnreadCount();
      }
    }
  }) as EventListener);

  window.addEventListener(CHAT_TYPING_EVENT, ((e: CustomEvent) => {
    if (userToken) return;
    const { typing } = e.detail;
    isTyping = typing;
    typingIndicator.style.display = typing ? 'flex' : 'none';
    if (isOpen) scrollToBottom();
  }) as EventListener);

  window.addEventListener(CHAT_STATUS_EVENT, ((e: CustomEvent) => {
    if (userToken) return;
    const statusText = document.getElementById('chat-status-text');
    if (statusText) statusText.textContent = `Status: ${e.detail.status}`;
    adminStatusSelect.value = e.detail.status;
  }) as EventListener);

  // Setup Initial states
  if (userToken) {
    initRealTimeChat();
  } else {
    adminStatusSelect.value = getConversationStatus();
    updateBadge();
    renderMessagesList();
    renderAdminMessages();
  }
}

function updateBadge() {
  const badge = document.getElementById('chat-fab-badge');
  if (!badge) return;
  const count = getUnreadCount();
  if (count > 0) {
    badge.textContent = count.toString();
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

function showError(msg, type = 'error') {
  const errEl = document.getElementById('chat-error');
  if (!errEl) return;
  errEl.className = `chat-error-alert ${type}`;
  errEl.textContent = msg;
  errEl.style.display = 'block';
  setTimeout(() => clearError(), 4000);
}

function clearError() {
  const errEl = document.getElementById('chat-error');
  if (errEl) errEl.style.display = 'none';
}

function scrollToBottom() {
  const container = document.getElementById('chat-messages-container');
  if (container) {
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth'
    });
  }
}

function scrollToBottomAdmin() {
  const container = document.getElementById('admin-messages-container');
  if (container) {
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth'
    });
  }
}

function renderMessagesList() {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;

  const userToken = localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const messages = userToken ? serverMessages : getMessages() as any[];

  container.innerHTML = messages.map(msg => {
    const isUser = userToken ? (msg.senderId === user.id) : (msg.sender === 'user');
    const alignClass = isUser ? 'user' : 'admin';
    
    let contentHtml = '';
    const fileUrl = msg.attachmentUrl || (msg.attachment && msg.attachment.url);
    const fileName = msg.content || msg.message || msg.text || 'File';

    if (fileUrl) {
      const isImage = fileUrl.match(/\.(jpeg|jpg|gif|png)/i) || (msg.attachment && msg.attachment.isImage);
      if (isImage) {
        contentHtml = `<img src="${fileUrl}" class="chat-msg-img" alt="${sanitizeHTML(fileName)}" />`;
      } else {
        contentHtml = `
          <div class="chat-msg-file">
            <span class="file-icon">📄</span>
            <div class="file-info">
              <span class="file-name">${sanitizeHTML(fileName)}</span>
            </div>
            <a href="${fileUrl}" download target="_blank" class="file-download-btn">⬇️</a>
          </div>
        `;
      }
    } else {
      contentHtml = `<p>${sanitizeHTML(msg.content || msg.message || msg.text || '')}</p>`;
    }

    let receiptHtml = '';
    if (isUser && userToken) {
      if (msg.seen) {
        receiptHtml = `<span style="font-size:9px; color:#10B981; margin-left:4px;">seen</span>`;
      } else if (msg.delivered) {
        receiptHtml = `<span style="font-size:9px; color:var(--text-tertiary); margin-left:4px;">delivered</span>`;
      } else {
        receiptHtml = `<span style="font-size:9px; color:var(--text-tertiary); margin-left:4px;">sent</span>`;
      }
    }

    const timestamp = msg.createdAt || msg.timestamp || new Date().toISOString();

    return `
      <div class="chat-message-bubble ${alignClass}">
        <div class="chat-message-content">
          ${contentHtml}
          <div style="display:flex; justify-content:flex-end; align-items:center;">
            <span class="chat-message-time">${formatTime(timestamp)}</span>
            ${receiptHtml}
          </div>
        </div>
      </div>
    `;
  }).join('');

  scrollToBottom();
}

function renderAdminMessages() {
  const container = document.getElementById('admin-messages-container');
  if (!container) return;

  const messages = getMessages();
  container.innerHTML = messages.map(msg => {
    const isUser = msg.sender === 'user';
    const alignClass = isUser ? 'admin' : 'user'; 
    const badgeName = isUser ? 'CLIENT' : 'ADMIN';
    
    let contentHtml = '';
    if (msg.type === 'file' && msg.attachment) {
      if (msg.attachment.isImage) {
        contentHtml = `<img src="${msg.attachment.url}" class="chat-msg-img" alt="${sanitizeHTML(msg.text)}" />`;
      } else {
        contentHtml = `
          <div class="chat-msg-file">
            <span class="file-icon">📄</span>
            <div class="file-info">
              <span class="file-name">${sanitizeHTML(msg.attachment.name)}</span>
              <span class="file-size">${msg.attachment.size}</span>
            </div>
            <a href="${msg.attachment.url}" download class="file-download-btn">⬇️</a>
          </div>
        `;
      }
    } else {
      contentHtml = `<p>${sanitizeHTML(msg.text)}</p>`;
    }

    return `
      <div class="chat-message-bubble ${alignClass}">
        <div style="font-size: 8px; margin-bottom: 2px; opacity: 0.6; padding-left: 4px;">
          ${badgeName}
        </div>
        <div class="chat-message-content">
          ${contentHtml}
          <span class="chat-message-time">${formatTime(msg.timestamp)}</span>
        </div>
      </div>
    `;
  }).join('');

  scrollToBottomAdmin();
}
