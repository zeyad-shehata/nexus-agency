// central chat state management using localStorage and custom Events to simulate real-time API
const CHAT_STORAGE_KEY = 'nexus_chat_history';
const CHAT_STATUS_KEY = 'nexus_chat_status';
const CHAT_UNREAD_KEY = 'nexus_chat_unread';

// Custom event name for real-time messages
export const CHAT_EVENT = 'nexus-chat-message';
export const CHAT_STATUS_EVENT = 'nexus-chat-status-change';
export const CHAT_TYPING_EVENT = 'nexus-chat-typing';

export const CHAT_STATUS = {
  OPEN: 'Open',
  PENDING: 'Pending',
  CLOSED: 'Closed'
};

const DEFAULT_MESSAGES = [
  {
    id: 'msg-welcome',
    sender: 'admin',
    text: 'Hello! Welcome to Nexus Agency. How can we help you today?',
    timestamp: new Date(Date.now() - 60000).toISOString(),
    type: 'text'
  }
];

export function getMessages() {
  const data = localStorage.getItem(CHAT_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(DEFAULT_MESSAGES));
    return DEFAULT_MESSAGES;
  }
  return JSON.parse(data);
}

export function saveMessages(messages) {
  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
}

export function getConversationStatus() {
  return localStorage.getItem(CHAT_STATUS_KEY) || CHAT_STATUS.OPEN;
}

export function setConversationStatus(status) {
  if (Object.values(CHAT_STATUS).includes(status)) {
    localStorage.setItem(CHAT_STATUS_KEY, status);
    window.dispatchEvent(new CustomEvent(CHAT_STATUS_EVENT, { detail: { status } }));
  }
}

export function getUnreadCount() {
  return parseInt(localStorage.getItem(CHAT_UNREAD_KEY) || '0', 10);
}

export function incrementUnreadCount() {
  const current = getUnreadCount();
  localStorage.setItem(CHAT_UNREAD_KEY, (current + 1).toString());
}

export function resetUnreadCount() {
  localStorage.setItem(CHAT_UNREAD_KEY, '0');
}

// Send a message
export function sendMessage(text, type = 'text', sender = 'user', attachment = null) {
  const messages = getMessages();
  const newMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    sender,
    text,
    timestamp: new Date().toISOString(),
    type,
    attachment
  };
  messages.push(newMessage);
  saveMessages(messages);

  // Dispatch event for real-time update in UI
  window.dispatchEvent(new CustomEvent(CHAT_EVENT, { detail: newMessage }));

  // Auto response behavior if user sent it
  if (sender === 'user') {
    setConversationStatus(CHAT_STATUS.OPEN);
    triggerAutoReply(text);
  }

  return newMessage;
}

// Simulate AI/Admin auto-response if nobody is actively replying
let autoReplyTimeout = null;
function triggerAutoReply(userText) {
  if (autoReplyTimeout) clearTimeout(autoReplyTimeout);

  // Dispatch typing state
  window.dispatchEvent(new CustomEvent(CHAT_TYPING_EVENT, { detail: { typing: true } }));

  // Contextual reply dictionary
  const text = userText.toLowerCase();
  let response = "Thanks for reaching out! One of our design agents will connect with you shortly.";
  
  if (text.includes('hello') || text.includes('hi')) {
    response = "Hi there! Glad you popped in. What kind of digital product are you planning to build?";
  } else if (text.includes('pricing') || text.includes('cost') || text.includes('budget')) {
    response = "Our projects start around $1,500. You can also try our interactive Cost Estimator at /estimator to get an instant breakdown!";
  } else if (text.includes('portfolio') || text.includes('work') || text.includes('projects')) {
    response = "We've delivered over 150+ projects! Head over to /portfolio to browse our masonry grid of case studies.";
  } else if (text.includes('time') || text.includes('long') || text.includes('duration')) {
    response = "Most standard web builds take 2-6 weeks. Custom enterprise portals or mobile apps might take 8-12 weeks.";
  } else if (text.includes('contact') || text.includes('phone') || text.includes('email')) {
    response = "You can drop us an email at hello@nexus.agency, call +1 (234) 567-890, or fill out the contact form at /contact.";
  }

  autoReplyTimeout = setTimeout(() => {
    // Stop typing
    window.dispatchEvent(new CustomEvent(CHAT_TYPING_EVENT, { detail: { typing: false } }));
    
    // Send message
    sendMessage(response, 'text', 'admin');
    incrementUnreadCount();
  }, 2000 + Math.random() * 2000);
}
