// ============================================
// NEXUS AGENCY — Unified Dashboards
// ============================================

import { API_BASE, SOCKET_URL, apiFetch } from '../utils/api';
import { showAlert } from '../components/ui/Alert';

let socket = null;
let currentActiveConversationId = null;

// XSS sanitizer for user-generated content
function sanitizeHTML(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

export function renderDashboard() {
  const userStr = localStorage.getItem('user');
  if (!userStr) {
    return `
      <section class="section" style="padding-top:12rem; text-align:center;">
        <div class="container" style="max-width: 500px;">
          <div class="glass-card reveal" style="padding:var(--space-10);">
            <div style="font-size:4rem; margin-bottom:var(--space-4);">🔒</div>
            <h2 style="font-size:var(--font-size-2xl); font-weight:800; margin-bottom:var(--space-2);">Access Denied</h2>
            <p style="color:var(--text-secondary); margin-bottom:var(--space-6);">You must be logged in to access the dashboard portal.</p>
            <a href="/auth" class="btn btn-primary" data-link>Sign In</a>
          </div>
        </div>
      </section>
    `;
  }

  const user = JSON.parse(userStr);
  const isAdmin = user.role === 'ADMIN';

  return `
    <section class="page-hero" style="padding: 10rem 0 3rem 0;">
      <div class="page-hero-bg"></div>
      <div class="page-hero-content">
        <div class="container" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:var(--space-4);">
          <div>
            <span class="section-label">✦ Workspace</span>
            <h1 class="section-title" style="font-size:var(--font-size-3xl); margin-bottom:0;">Welcome back, <span class="gradient-text">${user.name}</span></h1>
            <p style="color:var(--text-secondary); font-size:var(--font-size-sm); margin-top:var(--space-1);">${isAdmin ? 'Nexus Administrator Console' : 'Nexus Client Portal'}</p>
          </div>
          <button class="btn btn-secondary" onclick="handleLogout()" style="border-color:var(--accent-tertiary); color:var(--accent-tertiary);">Sign Out</button>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top: var(--space-4);">
      <div class="container">
        <div style="display:grid; grid-template-columns: 240px 1fr; gap:var(--space-8); align-items:start;" class="dashboard-grid">
          
          <!-- Sidebar Navigation -->
          <div class="glass-card" style="padding:var(--space-4); display:flex; flex-direction:column; gap:var(--space-2);">
            <button class="tab-btn active" id="btn-tab-overview" onclick="switchDashboardTab('overview')" style="width:100%; text-align:left; justify-content:flex-start;">📊 Overview</button>
            <button class="tab-btn" id="btn-tab-projects" onclick="switchDashboardTab('projects')" style="width:100%; text-align:left; justify-content:flex-start;">📁 Projects</button>
            <button class="tab-btn" id="btn-tab-chat" onclick="switchDashboardTab('chat')" style="width:100%; text-align:left; justify-content:flex-start;">💬 Support Chat</button>
            ${isAdmin ? `
              <button class="tab-btn" id="btn-tab-cms" onclick="switchDashboardTab('cms')" style="width:100%; text-align:left; justify-content:flex-start;">⚙️ CMS Manager</button>
              <button class="tab-btn" id="btn-tab-clients" onclick="switchDashboardTab('clients')" style="width:100%; text-align:left; justify-content:flex-start;">👥 Clients</button>
              <button class="tab-btn" id="btn-tab-logs" onclick="switchDashboardTab('logs')" style="width:100%; text-align:left; justify-content:flex-start;">📜 Audit Logs</button>
            ` : `
              <button class="tab-btn" id="btn-tab-notifications" onclick="switchDashboardTab('notifications')" style="width:100%; text-align:left; justify-content:flex-start;">🔔 Notifications <span class="badge" id="noti-unread-count" style="display:none; background:var(--accent-tertiary); margin-left:var(--space-2);">0</span></button>
            `}
            <button class="tab-btn" id="btn-tab-settings" onclick="switchDashboardTab('settings')" style="width:100%; text-align:left; justify-content:flex-start;">🔒 Account</button>
          </div>

          <!-- Content Panel -->
          <div class="dashboard-content-panel">
            <div id="db-alert" style="display: none; padding: var(--space-3) var(--space-4); border-radius: var(--radius-sm); margin-bottom: var(--space-6); font-size: var(--font-size-sm);"></div>

            <!-- Tab: Overview -->
            <div class="db-tab-content" id="tab-content-overview">
              <div id="overview-loading" class="loader-spinner">Loading metrics...</div>
              <div id="overview-content" style="display:none;"></div>
            </div>

            <!-- Tab: Projects -->
            <div class="db-tab-content" id="tab-content-projects" style="display:none;">
              <div id="projects-loading" class="loader-spinner">Loading projects...</div>
              <div id="projects-content" style="display:none;"></div>
            </div>

            <!-- Tab: Chat -->
            <div class="db-tab-content" id="tab-content-chat" style="display:none;">
              <div class="glass-card" style="padding:0; overflow:hidden; display:grid; grid-template-columns: ${isAdmin ? '280px 1fr' : '1fr'}; height:600px;">
                ${isAdmin ? `
                  <div style="border-right:1px solid var(--border-subtle); display:flex; flex-direction:column;">
                    <div style="padding:var(--space-4); font-weight:700; border-bottom:1px solid var(--border-subtle);">Client Channels</div>
                    <div id="chat-channels-list" style="overflow-y:auto; flex:1;">
                      <div style="padding:var(--space-4); color:var(--text-tertiary); text-align:center;">No active channels.</div>
                    </div>
                  </div>
                ` : ''}
                <div style="display:flex; flex-direction:column; height:100%;">
                  <!-- Chat Header -->
                  <div style="padding:var(--space-4); border-bottom:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.01);">
                    <div style="display:flex; align-items:center; gap:var(--space-2);">
                      <div style="width:10px; height:10px; border-radius:50%; background:var(--accent-secondary);" id="chat-status-dot"></div>
                      <span style="font-weight:700;" id="chat-header-title">${isAdmin ? 'Select a channel' : 'Nexus Concierge support'}</span>
                      <span id="chat-typing-indicator" style="display:none; font-size:var(--font-size-xs); color:var(--text-tertiary); margin-left:var(--space-2);">typing...</span>
                    </div>
                  </div>
                  <!-- Chat Messages -->
                  <div id="chat-messages-container" style="flex:1; overflow-y:auto; padding:var(--space-6); display:flex; flex-direction:column; gap:var(--space-4); background:rgba(0,0,0,0.15);"></div>
                  <!-- Chat Input -->
                  <form id="chat-input-form" onsubmit="handleSendDashboardMessage(event)" style="padding:var(--space-4); border-top:1px solid var(--border-subtle); display:flex; gap:var(--space-3); background:var(--bg-secondary);">
                    <input type="text" id="chat-msg-input" placeholder="Type your message..." class="form-input" style="flex:1;" oninput="emitTypingState()" />
                    <button type="submit" class="btn btn-primary">Send</button>
                  </form>
                </div>
              </div>
            </div>

            <!-- Tab: CMS (Admin only) -->
            ${isAdmin ? `
              <div class="db-tab-content" id="tab-content-cms" style="display:none;">
                <div class="tabs" style="margin-bottom: var(--space-4); overflow-x:auto;">
                  <button class="tab-btn active" id="btn-cms-services" onclick="switchCMSTab('services')">💼 Services</button>
                  <button class="tab-btn" id="btn-cms-portfolio" onclick="switchCMSTab('portfolio')">🎨 Portfolio</button>
                  <button class="tab-btn" id="btn-cms-blog" onclick="switchCMSTab('blog')">📝 Blog</button>
                  <button class="tab-btn" id="btn-cms-reviews" onclick="switchCMSTab('reviews')">⭐ Reviews</button>
                  <button class="tab-btn" id="btn-cms-contacts" onclick="switchCMSTab('contacts')">📧 Contact Requests</button>
                </div>
                <div id="cms-editor-content"></div>
              </div>
              
              <div class="db-tab-content" id="tab-content-clients" style="display:none;">
                <div style="display:flex; flex-direction:column; gap:var(--space-4);">
                  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:var(--space-3);">
                    <div>
                      <h3 style="font-weight:800; font-size:var(--font-size-xl); margin:0;">Client Directory</h3>
                      <p style="color:var(--text-secondary); margin-top:var(--space-2); font-size:var(--font-size-sm);">Quickly view and manage your active customers, contact details, and project status.</p>
                    </div>
                    <button class="btn btn-secondary" onclick="loadClientDirectory()" style="padding:var(--space-2) var(--space-4);">Refresh</button>
                  </div>
                  <div style="display:grid; grid-template-columns: 1fr 320px; gap:var(--space-4); align-items:start;">
                    <div class="glass-card" style="padding:var(--space-4); min-height: 360px;" id="client-directory-list">Loading clients...</div>
                    <div class="glass-card" style="padding:var(--space-4); min-height: 360px;" id="client-directory-detail">
                      <div style="color:var(--text-secondary);">Select a customer to view their profile and recent activity.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="db-tab-content" id="tab-content-logs" style="display:none;">
                <h3 style="font-weight:800; font-size:var(--font-size-xl); margin-bottom:var(--space-4);">System Audit Log</h3>
                <div class="glass-card" style="padding:0; overflow:hidden;">
                  <table style="width:100%; border-collapse:collapse; font-size:var(--font-size-sm); text-align:left;">
                    <thead>
                      <tr style="border-bottom:1px solid var(--border-subtle); background:rgba(255,255,255,0.02);">
                        <th style="padding:var(--space-3);">Timestamp</th>
                        <th style="padding:var(--space-3);">User ID</th>
                        <th style="padding:var(--space-3);">Action</th>
                        <th style="padding:var(--space-3);">Details</th>
                      </tr>
                    </thead>
                    <tbody id="logs-table-body"></tbody>
                  </table>
                </div>
              </div>
            ` : `
              <!-- Tab: Notifications (Client only) -->
              <div class="db-tab-content" id="tab-content-notifications" style="display:none;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-4);">
                  <h3 style="font-weight:800; font-size:var(--font-size-xl); margin:0;">Notifications</h3>
                  <button class="btn btn-secondary" onclick="markAllNotificationsRead()" style="padding:var(--space-1) var(--space-3); font-size:var(--font-size-xs);">Mark all as read</button>
                </div>
                <div id="notifications-list" style="display:flex; flex-direction:column; gap:var(--space-3);"></div>
              </div>
            `}

            <!-- Tab: Settings -->
            <div class="db-tab-content" id="tab-content-settings" style="display:none;">
              <h3 style="font-weight:800; font-size:var(--font-size-xl); margin-bottom:var(--space-6);">Change Password</h3>
              <form id="change-pwd-form" onsubmit="handleChangePasswordSubmit(event)" style="max-width:400px;">
                <div class="form-group">
                  <label class="form-label">Current Password</label>
                  <input type="password" id="change-pwd-current" class="form-input" required />
                </div>
                <div class="form-group">
                  <label class="form-label">New Password (Min 6 chars)</label>
                  <input type="password" id="change-pwd-new" class="form-input" required minlength="6" />
                </div>
                <button type="submit" class="btn btn-primary" style="margin-top:var(--space-2);">Update Password</button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </section>
  `;
}

// Global Actions & tab switching
export function initDashboard() {
  const userStr = localStorage.getItem('user');
  if (!userStr) return;
  const user = JSON.parse(userStr);

  (window as any).switchDashboardTab('overview');
  initRealtimeChat(user);

  (window as any).switchDashboardTab = function(tabId: string) {
    document.querySelectorAll<HTMLElement>('.db-tab-content').forEach(c => c.style.display = 'none');
    document.querySelectorAll('.dashboard-grid .tab-btn').forEach(b => b.classList.remove('active'));
    
    const targetContent = document.getElementById(`tab-content-${tabId}`);
    const targetBtn = document.getElementById(`btn-tab-${tabId}`);
    if (targetContent) targetContent.style.display = 'block';
    if (targetBtn) targetBtn.classList.add('active');

    // Trigger tab-specific loading
    if (tabId === 'overview') loadOverviewMetrics(user);
    if (tabId === 'projects') loadProjects(user);
    if (tabId === 'chat') {
      setTimeout(() => {
        const chatContainer = document.getElementById('chat-messages-container');
        if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 50);
    }
    if (tabId === 'clients' && user.role === 'ADMIN') loadClientDirectory();
    if (tabId === 'cms' && user.role === 'ADMIN') (window as any).switchCMSTab('services');
    if (tabId === 'logs' && user.role === 'ADMIN') loadAuditLogs();
    if (tabId === 'notifications' && user.role !== 'ADMIN') loadNotifications();
  };

  window.handleLogout = function() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    if (socket) socket.disconnect();
    window.history.pushState({}, '', '/auth');
    window.dispatchEvent(new Event('popstate'));
    window.dispatchEvent(new Event('authChange'));
  };

  window.handleChangePasswordSubmit = async function(e) {
    e.preventDefault();
    const currentPassword = (document.getElementById('change-pwd-current') as HTMLInputElement).value;
    const newPassword = (document.getElementById('change-pwd-new') as HTMLInputElement).value;
    const alert = document.getElementById('db-alert');

    try {
      const res = await fetch(`${API_BASE}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to change password.');

      showAlert(alert, 'success', 'Password updated successfully!');
      e.target.reset();
    } catch (err) {
      showAlert(alert, 'error', err.message);
    }
  };
}

// Real-Time Chat handling
function initRealtimeChat(user) {
  const token = localStorage.getItem('accessToken');
  if (!token) return;

  // Lazy load Socket.IO client from CDN if it doesn't exist
  if (typeof (window as any).io === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.socket.io/4.7.5/socket.io.min.js';
    script.onload = () => connectSocket(user, token);
    document.head.appendChild(script);
  } else {
    connectSocket(user, token!);
  }
}

let onlineUserIds = [];
let cachedConversations = [];

function connectSocket(user, token) {
  if (socket) return;
  
  socket = (window as any).io(SOCKET_URL, {
    auth: { token }
  });

  socket.on('connect', () => {
    console.log('⚡ Connected to support WebSocket server.');
    const dot = document.getElementById('chat-status-dot');
    if (dot) dot.style.background = 'var(--accent-secondary)';
    
    if (user.role === 'USER') {
      loadClientConversation();
    } else {
      loadAdminConversations();
    }
  });

  socket.on('online_users', (users) => {
    onlineUserIds = users;
    if (user.role === 'ADMIN') {
      renderAdminConversationsUI();
    } else {
      // Check if admin is online (any admin)
      const dot = document.getElementById('chat-status-dot');
      if (dot) {
        dot.style.background = users.length > 1 ? '#10B981' : 'var(--accent-secondary)';
      }
    }
  });

  socket.on('message_received', (msg) => {
    if (currentActiveConversationId && msg.conversationId === currentActiveConversationId) {
      appendChatMessage(msg, user.id);
      // Automatically send read receipt back
      socket.emit('message_read', { conversationId: currentActiveConversationId, messageId: msg.id });
    } else {
      // Notify about unread messages
      if (user.role === 'ADMIN') {
        loadAdminConversations();
      } else {
        const badge = document.getElementById('btn-tab-chat-badge');
        if (badge) {
          badge.style.display = 'inline-block';
        }
      }
    }
  });

  socket.on('user_typing', ({ conversationId, typing, userId }) => {
    if (conversationId === currentActiveConversationId && userId !== user.id) {
      const el = document.getElementById('chat-typing-indicator');
      if (el) el.style.display = typing ? 'inline' : 'none';
    }
  });

  socket.on('message_read_receipt', ({ conversationId, userId }) => {
    if (conversationId === currentActiveConversationId && userId !== user.id) {
      // Update read status locally
      const container = document.getElementById('chat-messages-container');
      if (container) {
        const unreads = container.querySelectorAll<HTMLElement>('.msg-status-receipt');
        unreads.forEach(span => {
          span.textContent = 'seen';
          span.style.color = '#10B981';
        });
      }
    }
  });

  socket.on('disconnect', () => {
    const dot = document.getElementById('chat-status-dot');
    if (dot) dot.style.background = 'var(--text-muted)';
  });
}

// CLIENT CHAT
async function loadClientConversation() {
  try {
    const res = await fetch(`${API_BASE}/chat/conversations`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    const conversations = await res.json();
    if (!res.ok) throw new Error(conversations.error || 'Failed to fetch messages.');
    
    let conv = conversations[0];
    if (!conv) {
      // Create a default conversation
      const createRes = await fetch(`${API_BASE}/chat/conversation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({})
      });
      conv = await createRes.json();
    }
    
    if (conv) {
      currentActiveConversationId = conv.id;
      socket.emit('join_conversation', { conversationId: conv.id });
      // Send read event
      socket.emit('message_read', { conversationId: conv.id });
      loadMessages(conv.id);
    }
  } catch (err) {
    console.error(err);
  }
}

// ADMIN CHAT
async function loadAdminConversations() {
  const listContainer = document.getElementById('chat-channels-list');
  if (!listContainer) return;

  try {
    const res = await fetch(`${API_BASE}/chat/conversations`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    cachedConversations = await res.json();
    if (!res.ok) throw new Error();

    renderAdminConversationsUI();
  } catch (err) {
    console.error(err);
  }
}

function renderAdminConversationsUI() {
  const listContainer = document.getElementById('chat-channels-list');
  if (!listContainer) return;

  if (cachedConversations.length === 0) {
    listContainer.innerHTML = `<div style="padding:var(--space-4); color:var(--text-tertiary); text-align:center;">No channels active.</div>`;
    return;
  }

  listContainer.innerHTML = cachedConversations.map(c => {
    const lastMsg = c.messages[c.messages.length - 1]?.content || c.messages[c.messages.length - 1]?.message || 'No messages yet';
    const isSelected = c.id === currentActiveConversationId;
    const isOnline = onlineUserIds.includes(c.client.id);
    const initials = c.client.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const avatarHtml = c.client.avatar 
      ? `<img src="${c.client.avatar}" style="width:36px; height:36px; border-radius:50%; object-fit:cover; display:block;" />`
      : `<div style="width:36px; height:36px; border-radius:50%; background:var(--accent-primary); color:white; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">${initials}</div>`;
      
    const lastActivity = new Date(c.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const unreadHtml = c.unreadCount > 0 
      ? `<div style="background:var(--accent-secondary); color:white; font-size:10px; font-weight:700; min-width:18px; height:18px; border-radius:50%; display:flex; align-items:center; justify-content:center; padding:0 4px; margin-left:var(--space-2);">${c.unreadCount}</div>`
      : '';

    return `
      <div onclick="selectAdminChannel('${c.id}', '${c.client.name}')" class="chat-channel-item" 
           style="display:flex; align-items:center; gap:var(--space-3); padding:var(--space-4); border-bottom:1px solid var(--border-subtle); cursor:pointer; background:${isSelected ? 'rgba(255,255,255,0.05)' : 'none'}; position:relative;">
        <div style="position:relative;">
          ${avatarHtml}
          <div style="width:10px; height:10px; border-radius:50%; border:2px solid var(--bg-primary); background:${isOnline ? '#10B981' : '#6B7280'}; position:absolute; bottom:0; right:0;"></div>
        </div>
        <div style="flex:1; min-width:0;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2px;">
            <span style="font-weight:700; font-size:var(--font-size-sm); color:var(--text-primary);">${c.client.name}</span>
            <span style="font-size:10px; color:var(--text-tertiary);">${lastActivity}</span>
          </div>
          <div style="font-size:var(--font-size-xs); color:var(--text-secondary); text-overflow:ellipsis; white-space:nowrap; overflow:hidden;">
            ${lastMsg}
          </div>
        </div>
        <div>
          ${unreadHtml}
        </div>
      </div>
    `;
  }).join('');
}

window.selectAdminChannel = function(convId, clientName) {
  currentActiveConversationId = convId;
  document.getElementById('chat-header-title').textContent = `Chat with ${clientName}`;
  socket.emit('join_conversation', { conversationId: convId });
  socket.emit('message_read', { conversationId: convId });
  
  // Clear local unread counts
  const found = cachedConversations.find(c => c.id === convId);
  if (found) found.unreadCount = 0;
  
  loadMessages(convId);
  renderAdminConversationsUI(); // refresh badges and highlight
};

async function loadMessages(convId) {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;

  const user = JSON.parse(localStorage.getItem('user'));
  try {
    const res = await fetch(`${API_BASE}/chat/${convId}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    const messages = await res.json();
    if (!res.ok) throw new Error();

    container.innerHTML = messages.map(m => {
      const isMe = m.senderId === user.id;
      const fileUrl = m.attachmentUrl || (m.attachment && m.attachment.url) || m.attachment;
      const fileName = m.content || m.message || 'File';
      
      let contentHtml = '';
      if (fileUrl) {
        const isImage = fileUrl.match(/\.(jpeg|jpg|gif|png)/i) || (m.attachment && m.attachment.isImage);
        if (isImage) {
          contentHtml = `<img src="${fileUrl}" style="max-width:240px; max-height:240px; border-radius:var(--radius-sm); margin-top:var(--space-2); display:block;" alt="${fileName}" />`;
        } else {
          contentHtml = `
            <div style="display:flex; align-items:center; gap:var(--space-2); padding:var(--space-2); background:rgba(255,255,255,0.05); border-radius:var(--radius-sm); margin-top:var(--space-2);">
              <span>📄</span>
              <span style="font-size:var(--font-size-xs); color:white; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:150px;">${fileName}</span>
              <a href="${fileUrl}" download target="_blank" style="color:var(--accent-primary); text-decoration:none;">⬇️</a>
            </div>
          `;
        }
      } else {
        contentHtml = `<div>${sanitizeHTML(m.content || m.message || '')}</div>`;
      }

      let receiptHtml = '';
      if (isMe) {
        if (m.seen) {
          receiptHtml = `<span class="msg-status-receipt" style="font-size:9px; color:#10B981; margin-left:4px;">seen</span>`;
        } else if (m.delivered) {
          receiptHtml = `<span class="msg-status-receipt" style="font-size:9px; color:var(--text-tertiary); margin-left:4px;">delivered</span>`;
        } else {
          receiptHtml = `<span class="msg-status-receipt" style="font-size:9px; color:var(--text-tertiary); margin-left:4px;">sent</span>`;
        }
      }

      return `
        <div style="align-self: ${isMe ? 'flex-end' : 'flex-start'}; max-width: 70%; display: flex; flex-direction: column; align-items: ${isMe ? 'flex-end' : 'flex-start'};">
          <div style="background: ${isMe ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)'}; padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); font-size: var(--font-size-sm); border-top-${isMe ? 'right' : 'left'}-radius: 0;">
            ${contentHtml}
          </div>
          <div style="display:flex; align-items:center; margin-top: var(--space-1);">
            <span style="font-size: 10px; color: var(--text-tertiary);">${new Date(m.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            ${receiptHtml}
          </div>
        </div>
      `;
    }).join('');
    container.scrollTop = container.scrollHeight;
  } catch (err) {
    console.error(err);
  }
}

function appendChatMessage(msg, myUserId) {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;
  const isMe = msg.senderId === myUserId;
  const newMsgDiv = document.createElement('div');
  newMsgDiv.style.alignSelf = isMe ? 'flex-end' : 'flex-start';
  newMsgDiv.style.maxWidth = '70%';
  newMsgDiv.style.display = 'flex';
  newMsgDiv.style.flexDirection = 'column';
  newMsgDiv.style.alignItems = isMe ? 'flex-end' : 'flex-start';
  
  const fileUrl = msg.attachmentUrl || (msg.attachment && msg.attachment.url) || msg.attachment;
  const fileName = msg.content || msg.message || 'File';
  
  let contentHtml = '';
  if (fileUrl) {
    const isImage = fileUrl.match(/\.(jpeg|jpg|gif|png)/i) || (msg.attachment && msg.attachment.isImage);
    if (isImage) {
      contentHtml = `<img src="${fileUrl}" style="max-width:240px; max-height:240px; border-radius:var(--radius-sm); margin-top:var(--space-2); display:block;" alt="${fileName}" />`;
    } else {
      contentHtml = `
        <div style="display:flex; align-items:center; gap:var(--space-2); padding:var(--space-2); background:rgba(255,255,255,0.05); border-radius:var(--radius-sm); margin-top:var(--space-2);">
          <span>📄</span>
          <span style="font-size:var(--font-size-xs); color:white; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:150px;">${fileName}</span>
          <a href="${fileUrl}" download target="_blank" style="color:var(--accent-primary); text-decoration:none;">⬇️</a>
        </div>
      `;
    }
  } else {
    contentHtml = `<div>${sanitizeHTML(msg.content || msg.message || '')}</div>`;
  }

  let receiptHtml = '';
  if (isMe) {
    if (msg.seen) {
      receiptHtml = `<span class="msg-status-receipt" style="font-size:9px; color:#10B981; margin-left:4px;">seen</span>`;
    } else if (msg.delivered) {
      receiptHtml = `<span class="msg-status-receipt" style="font-size:9px; color:var(--text-tertiary); margin-left:4px;">delivered</span>`;
    } else {
      receiptHtml = `<span class="msg-status-receipt" style="font-size:9px; color:var(--text-tertiary); margin-left:4px;">sent</span>`;
    }
  }
  
  newMsgDiv.innerHTML = `
    <div style="background: ${isMe ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)'}; padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); font-size: var(--font-size-sm); border-top-${isMe ? 'right' : 'left'}-radius: 0;">
      ${contentHtml}
    </div>
    <div style="display:flex; align-items:center; margin-top: var(--space-1);">
      <span style="font-size: 10px; color: var(--text-tertiary);">${new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
      ${receiptHtml}
    </div>
  `;
  container.appendChild(newMsgDiv);
  container.scrollTop = container.scrollHeight;
}

let typingTimeout = null;
window.emitTypingState = function() {
  if (!socket || !currentActiveConversationId) return;
  if (typingTimeout) clearTimeout(typingTimeout);

  socket.emit('typing_state', { conversationId: currentActiveConversationId, typing: true });

  typingTimeout = setTimeout(() => {
    socket.emit('typing_state', { conversationId: currentActiveConversationId, typing: false });
  }, 2000);
};

// Message Sending
window.handleSendDashboardMessage = async function(e) {
  e.preventDefault();
  const input = document.getElementById('chat-msg-input') as HTMLInputElement;
  const text = input.value.trim();
  if (!text || !currentActiveConversationId) return;

  try {
    const res = await fetch(`${API_BASE}/chat/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ conversationId: currentActiveConversationId, message: text })
    });
    const data = await res.json();
    if (!res.ok) throw new Error();

    // Reset indicator and input
    input.value = '';
    socket.emit('typing_state', { conversationId: currentActiveConversationId, typing: false });
    
    const user = JSON.parse(localStorage.getItem('user'));
    appendChatMessage(data, user.id);
    
    // Refresh conversation list to show updated last message
    if (user.role === 'ADMIN') {
      loadAdminConversations();
    }
  } catch (err) {
    console.error(err);
  }
};


// METRICS & OVERVIEWS
async function loadOverviewMetrics(user) {
  const loading = document.getElementById('overview-loading');
  const container = document.getElementById('overview-content');
  if (!loading || !container) return;

  try {
    if (user.role === 'ADMIN') {
      const res = await apiFetch('/admin/analytics');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch metrics');

      // Extract analytics from the correct response shape
      const a = data.analytics || data;

      loading.style.display = 'none';
      container.style.display = 'block';
      container.innerHTML = `
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:var(--space-4); margin-bottom:var(--space-8);">
          <div class="glass-card" style="text-align:center;">
            <div style="font-size:2rem; font-weight:900;" class="gradient-text">${a.activeProjects ?? 0}</div>
            <div style="color:var(--text-secondary); font-size:var(--font-size-sm); margin-top:var(--space-1);">Active Projects</div>
          </div>
          <div class="glass-card" style="text-align:center;">
            <div style="font-size:2rem; font-weight:900;" class="gradient-text">${a.pendingProjects ?? 0}</div>
            <div style="color:var(--text-secondary); font-size:var(--font-size-sm); margin-top:var(--space-1);">Pending Proposals</div>
          </div>
          <div class="glass-card" style="text-align:center;">
            <div style="font-size:2rem; font-weight:900;" class="gradient-text">${a.totalClients ?? 0}</div>
            <div style="color:var(--text-secondary); font-size:var(--font-size-sm); margin-top:var(--space-1);">Total Clients</div>
          </div>
          <div class="glass-card" style="text-align:center;">
            <div style="font-size:2rem; font-weight:900;" class="gradient-text">${a.pendingContactRequests ?? 0}</div>
            <div style="color:var(--text-secondary); font-size:var(--font-size-sm); margin-top:var(--space-1);">Inquiries</div>
          </div>
        </div>

        <h3 style="font-weight:800; font-size:var(--font-size-xl); margin-bottom:var(--space-4);">Recent Client Proposals</h3>
        <div id="admin-recent-proposals" style="display:flex; flex-direction:column; gap:var(--space-4);"></div>
      `;
      
      // Pull and render projects on dashboard
      const projectsRes = await apiFetch('/projects');
      const projectsData = await projectsRes.json();
      // Handle both { projects: [...] } and [...] response shapes
      const projects = Array.isArray(projectsData) ? projectsData : (projectsData.projects || []);
      if (projectsRes.ok && projects.length > 0) {
        document.getElementById('admin-recent-proposals').innerHTML = projects.slice(0, 3).map(p => `
          <div class="glass-card" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:var(--space-4);">
            <div>
              <div style="font-weight:700;">${sanitizeHTML(p.title)}</div>
              <div style="font-size:var(--font-size-xs); color:var(--text-secondary); margin-top:var(--space-1);">Client: ${sanitizeHTML(p.client?.name || 'N/A')} | Budget: ${sanitizeHTML(p.budget)}</div>
            </div>
            <span class="badge" style="background:var(--bg-tertiary);">${sanitizeHTML(p.status)}</span>
          </div>
        `).join('');
      } else {
        document.getElementById('admin-recent-proposals').innerHTML = '<div style="color:var(--text-tertiary);">No proposals submitted yet.</div>';
      }
    } else {
      // Client Overview
      loading.style.display = 'none';
      container.style.display = 'block';

      // Load client projects count
      const res = await apiFetch('/projects');
      const projectsData = await res.json();
      if (!res.ok) throw new Error();
      // Handle both { projects: [...] } and [...] response shapes
      const projects = Array.isArray(projectsData) ? projectsData : (projectsData.projects || []);

      const activeProjects = projects.filter(p => p.status !== 'Completed');

      container.innerHTML = `
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:var(--space-4); margin-bottom:var(--space-8);">
          <div class="glass-card" style="text-align:center;">
            <div style="font-size:2.5rem; font-weight:900; color:var(--accent-primary);">${projects.length}</div>
            <div style="color:var(--text-secondary); font-size:var(--font-size-sm); margin-top:var(--space-1);">Total Submitted Projects</div>
          </div>
          <div class="glass-card" style="text-align:center;">
            <div style="font-size:2.5rem; font-weight:900; color:var(--accent-secondary);">${activeProjects.length}</div>
            <div style="color:var(--text-secondary); font-size:var(--font-size-sm); margin-top:var(--space-1);">Active Projects</div>
          </div>
        </div>

        <div class="glass-card" style="padding:var(--space-6);">
          <h3 style="font-weight:800; font-size:var(--font-size-lg); margin-bottom:var(--space-2);">Welcome to your Workspace</h3>
          <p style="color:var(--text-secondary); font-size:var(--font-size-sm); line-height:var(--line-height-relaxed);">
            Track progress of your requested proposals, chat with the development leads, upload design mockups or source specifications, and download product prototypes straight from the "Projects" and "Support Chat" tabs.
          </p>
        </div>
      `;
    }
  } catch (err) {
    loading.textContent = `Error loading overview: ${err.message}`;
  }
}

// PROJECTS LOADING & OPERATIONS
async function loadProjects(user) {
  const loading = document.getElementById('projects-loading');
  const container = document.getElementById('projects-content');
  if (!loading || !container) return;

  try {
    const res = await apiFetch('/projects');
    const projectsData = await res.json();
    if (!res.ok) throw new Error(projectsData.error || 'Failed to load projects');
    // Handle both { projects: [...] } and [...] response shapes
    const projects = Array.isArray(projectsData) ? projectsData : (projectsData.projects || []);

    loading.style.display = 'none';
    container.style.display = 'block';

    if (projects.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:var(--space-12); color:var(--text-secondary);">
        No projects found. Ready to kickstart your next build? <a href="/start-project" class="gradient-text" data-link>Start your project proposal →</a>
      </div>`;
      return;
    }

    container.innerHTML = projects.map(p => `
      <div class="glass-card" style="margin-bottom:var(--space-6); padding:var(--space-6);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:var(--space-4); margin-bottom:var(--space-4);">
          <div>
            <h3 style="font-weight:800; font-size:var(--font-size-lg); margin:0;">${p.title}</h3>
            <span style="font-size:var(--font-size-xs); color:var(--text-secondary);">ID: ${p.id}</span>
          </div>
          <div style="display:flex; align-items:center; gap:var(--space-2); flex-wrap:wrap;">
            ${user.role === 'ADMIN' ? `
              <select class="form-select form-input" style="padding:var(--space-1) var(--space-2); font-size:var(--font-size-xs);" onchange="updateProjectStatusDirect('${p.id}', this.value)">
                ${['Under Review', 'Approved', 'Discovery', 'Design', 'Development', 'Testing', 'Completed', 'Cancelled'].map(status => `
                  <option value="${status}" ${p.status === status ? 'selected' : ''}>${status}</option>
                `).join('')}
              </select>
              <button class="btn btn-secondary" onclick="showCustomerDetails('${p.client?.id || ''}')" style="padding:var(--space-1) var(--space-3); font-size:var(--font-size-xs);">View Client</button>
              <button class="btn btn-secondary" onclick="deleteProjectDirect('${p.id}')" style="border-color:var(--accent-tertiary); color:var(--accent-tertiary); padding:var(--space-1) var(--space-3); font-size:var(--font-size-xs);">Delete</button>
            ` : `
              <span class="badge badge-green">${p.status}</span>
            `}
          </div>
        </div>

        <p style="color:var(--text-secondary); font-size:var(--font-size-sm); margin-bottom:var(--space-4);">${p.description}</p>
        
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:var(--space-4); font-size:var(--font-size-xs); color:var(--text-tertiary); margin-bottom:var(--space-6);">
          <div><strong>Industry:</strong> ${p.industry || 'General'}</div>
          <div><strong>Budget:</strong> ${p.budget || 'N/A'}</div>
          <div><strong>Timeline:</strong> ${p.timeline || 'Flexible'}</div>
          <div><strong>Preferred Colors:</strong> ${p.preferredColors || 'N/A'}</div>
        </div>

        ${p.aiSummary ? `
          <div style="background:rgba(124, 92, 252, 0.05); border-left:3px solid var(--accent-primary); padding:var(--space-3) var(--space-4); border-radius:var(--radius-sm); margin-bottom:var(--space-6);">
            <div style="font-weight:700; color:var(--accent-primary); font-size:var(--font-size-xs); margin-bottom:var(--space-1);">✦ AI Technical Assessment</div>
            <p style="font-size:var(--font-size-sm); color:var(--text-secondary); line-height:var(--line-height-relaxed); margin:0;">${p.aiSummary}</p>
          </div>
        ` : ''}

        <!-- Files Section -->
        <h4 style="font-size:var(--font-size-sm); font-weight:700; margin-bottom:var(--space-3);">Project Documents & Deliverables</h4>
        <div style="display:flex; flex-direction:column; gap:var(--space-2); margin-bottom:var(--space-4);">
          ${p.files && p.files.length > 0 ? p.files.map(f => `
            <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.02); padding:var(--space-2) var(--space-4); border-radius:var(--radius-sm); font-size:var(--font-size-xs);">
              <span>📄 ${sanitizeHTML(f.filename || f.name || 'File')}</span>
              <a href="${f.url}" target="_blank" class="gradient-text">Download</a>
            </div>
          `).join('') : '<div style="font-size:var(--font-size-xs); color:var(--text-muted);">No documents uploaded yet.</div>'}
        </div>

        <!-- File Upload Form -->
        <form onsubmit="handleProjectFileUpload(event, '${p.id}')" style="display:flex; gap:var(--space-2); align-items:center;">
          <input type="file" required class="form-input" style="font-size:var(--font-size-xs); flex:1; max-width:300px; padding:var(--space-1);" />
          <button type="submit" class="btn btn-primary" style="padding:var(--space-1) var(--space-4); font-size:var(--font-size-xs);">Upload File</button>
        </form>
      </div>
    `).join('');

    // Admin direct actions
    window.updateProjectStatusDirect = async function(id, val) {
      try {
        const res = await fetch(`${API_BASE}/projects/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify({ status: val })
        });
        if (!res.ok) throw new Error();
        showAlert(document.getElementById('db-alert'), 'success', 'Project status updated!');
      } catch (err) {
        showAlert(document.getElementById('db-alert'), 'error', 'Failed to update project status.');
      }
    };

    window.deleteProjectDirect = async function(id) {
      if (!confirm('Are you sure you want to delete this project?')) return;
      try {
        const res = await fetch(`${API_BASE}/projects/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        if (!res.ok) throw new Error();
        showAlert(document.getElementById('db-alert'), 'success', 'Project deleted!');
        loadProjects(user);
      } catch (err) {
        showAlert(document.getElementById('db-alert'), 'error', 'Failed to delete project.');
      }
    };

    window.handleProjectFileUpload = async function(e, projectId) {
      e.preventDefault();
      const input = e.target.querySelector('input[type="file"]');
      const file = input.files[0];
      if (!file) return;

      const btn = e.target.querySelector('button');
      btn.textContent = 'Uploading...';
      btn.disabled = true;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', file.name);

      try {
        const res = await fetch(`${API_BASE}/projects/${projectId}/files`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
          body: formData
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed.');

        showAlert(document.getElementById('db-alert'), 'success', 'File uploaded successfully!');
        loadProjects(user);
      } catch (err) {
        showAlert(document.getElementById('db-alert'), 'error', err.message);
      } finally {
        btn.textContent = 'Upload File';
        btn.disabled = false;
      }
    };
  } catch (err) {
    loading.textContent = `Error: ${err.message}`;
  }
}

let cachedClientDirectory = [];
let selectedClientId = '';

async function loadClientDirectory() {
  const listContainer = document.getElementById('client-directory-list');
  const detailContainer = document.getElementById('client-directory-detail');
  if (!listContainer || !detailContainer) return;

  listContainer.innerHTML = '<div class="loader-spinner">Loading clients...</div>';
  detailContainer.innerHTML = '<div style="color:var(--text-secondary);">Select a customer to view their profile and project details.</div>';

  try {
    const res = await apiFetch('/admin/users');
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to load clients.');

    cachedClientDirectory = Array.isArray(data.users) ? data.users : data.users || [];
    if (cachedClientDirectory.length === 0) {
      listContainer.innerHTML = '<div style="color:var(--text-secondary);">No customers found yet.</div>';
      return;
    }

    listContainer.innerHTML = cachedClientDirectory.map(client => `
      <div class="glass-card" style="padding:var(--space-3); margin-bottom:var(--space-2); display:flex; justify-content:space-between; align-items:center; gap:var(--space-3);">
        <div style="min-width:0;">
          <div style="font-weight:700;">${sanitizeHTML(client.name || 'Unnamed')}</div>
          <div style="font-size:var(--font-size-xs); color:var(--text-secondary);">${sanitizeHTML(client.email)}</div>
        </div>
        <button class="btn btn-secondary" onclick="showCustomerDetails('${client.id}')" style="padding:var(--space-1) var(--space-3); font-size:var(--font-size-xs);">Show</button>
      </div>
    `).join('');
  } catch (err) {
    listContainer.innerHTML = `<div style="color:var(--accent-danger);">${err.message}</div>`;
    console.error(err);
  }
}

window.showCustomerDetails = function(id) {
  const detailContainer = document.getElementById('client-directory-detail');
  if (!detailContainer) return;

  selectedClientId = id;
  const client = cachedClientDirectory.find(c => c.id === id);
  if (!client) {
    detailContainer.innerHTML = '<div style="color:var(--accent-danger);">Customer information not available. Please refresh the directory.</div>';
    return;
  }

  detailContainer.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:var(--space-3); flex-wrap:wrap;">
      <div>
        <div style="font-size:var(--font-size-xl); font-weight:800;">${sanitizeHTML(client.name)}</div>
        <div style="font-size:var(--font-size-sm); color:var(--text-secondary);">${sanitizeHTML(client.email)}</div>
      </div>
      <span class="badge" style="background:var(--accent-secondary);">${sanitizeHTML(client.role)}</span>
    </div>
    <div style="margin-top:var(--space-4); display:grid; grid-template-columns:1fr; gap:var(--space-3);">
      <div style="background:rgba(255,255,255,0.03); padding:var(--space-3); border-radius:var(--radius-sm);">
        <div style="font-weight:700; margin-bottom:var(--space-1);">Contact</div>
        <div style="font-size:var(--font-size-sm); color:var(--text-secondary);">Phone: ${sanitizeHTML(client.phone || 'Not provided')}</div>
        <div style="font-size:var(--font-size-sm); color:var(--text-secondary);">Member since: ${new Date(client.createdAt).toLocaleDateString()}</div>
      </div>
      <div style="background:rgba(255,255,255,0.03); padding:var(--space-3); border-radius:var(--radius-sm);">
        <div style="font-weight:700; margin-bottom:var(--space-1);">Quick Actions</div>
        <button class="btn btn-primary" onclick="window.location.href='/dashboard'" style="width:100%; padding:var(--space-2);">View full dashboard</button>
      </div>
    </div>
  `;
};

// NOTIFICATIONS
async function loadNotifications() {
  const container = document.getElementById('notifications-list');
  if (!container) return;

  try {
    const res = await fetch(`${API_BASE}/notifications`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    const notis = await res.json();
    if (!res.ok) throw new Error();

    const unread = notis.filter(n => !n.read).length;
    const badge = document.getElementById('noti-unread-count');
    if (badge) {
      badge.textContent = unread;
      badge.style.display = unread > 0 ? 'inline' : 'none';
    }

    if (notis.length === 0) {
      container.innerHTML = `<div style="text-align:center; color:var(--text-tertiary); padding:var(--space-6);">No notifications yet.</div>`;
      return;
    }

    container.innerHTML = notis.map(n => `
      <div class="glass-card" style="opacity: ${n.read ? '0.6' : '1'}; border-left: 3px solid ${n.read ? 'transparent' : 'var(--accent-secondary)'}; padding:var(--space-3) var(--space-4);">
        <div style="font-weight:700; font-size:var(--font-size-sm);">${n.title}</div>
        <p style="font-size:var(--font-size-xs); color:var(--text-secondary); margin:var(--space-1) 0 0 0;">${n.message}</p>
        <span style="font-size:9px; color:var(--text-tertiary);">${new Date(n.createdAt).toLocaleDateString()}</span>
      </div>
    `).join('');
  } catch (err) {
    console.error(err);
  }
}

window.markAllNotificationsRead = async function() {
  try {
    await fetch(`${API_BASE}/notifications/read`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    loadNotifications();
  } catch (err) {
    console.error(err);
  }
};

// AUDIT LOGS (Admin)
async function loadAuditLogs() {
  const tbody = document.getElementById('logs-table-body');
  if (!tbody) return;

  try {
    const res = await apiFetch('/admin/logs');
    const logsData = await res.json();
    if (!res.ok) throw new Error();
    // Handle both { logs: [...] } and [...] response shapes
    const logs = Array.isArray(logsData) ? logsData : (logsData.logs || []);

    tbody.innerHTML = logs.map(l => `
      <tr style="border-bottom:1px solid var(--border-subtle);">
        <td style="padding:var(--space-2) var(--space-3); color:var(--text-secondary);">${new Date(l.createdAt).toLocaleString()}</td>
        <td style="padding:var(--space-2) var(--space-3); color:var(--text-tertiary);">${l.userId || 'SYSTEM'}</td>
        <td style="padding:var(--space-2) var(--space-3); font-weight:700;">${l.action}</td>
        <td style="padding:var(--space-2) var(--space-3); color:var(--text-secondary);">${l.details}</td>
      </tr>
    `).join('');
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-tertiary); padding:var(--space-4);">Failed to load audit logs.</td></tr>`;
  }
}

// CMS RESOURCE MANAGEMENT
window.switchCMSTab = async function(resource) {
  const container = document.getElementById('cms-editor-content');
  if (!container) return;

  document.querySelectorAll('#tab-content-cms .tab-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(`btn-cms-${resource}`);
  if (btn) btn.classList.add('active');

  container.innerHTML = `<div class="loader-spinner">Loading CMS list...</div>`;

  try {
    const res = await fetch(`${API_BASE}/${resource === 'contacts' ? 'contact' : resource}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    const items = await res.json();
    if (!res.ok) throw new Error();

    if (resource === 'services') {
      renderServicesCMS(items, container);
    } else if (resource === 'portfolio') {
      renderPortfolioCMS(items, container);
    } else if (resource === 'blog') {
      renderBlogCMS(items, container);
    } else if (resource === 'reviews') {
      renderReviewsCMS(items, container);
    } else if (resource === 'contacts') {
      renderContactsCMS(items, container);
    }
  } catch (err) {
    container.innerHTML = `<div style="color:var(--text-tertiary);">Failed to load resource list.</div>`;
  }
};

// CMS Render and Operation blocks
function renderServicesCMS(items, el) {
  el.innerHTML = `
    <button class="btn btn-primary" onclick="showServiceForm()" style="margin-bottom:var(--space-4);">Add Service</button>
    <div id="service-form-wrapper" style="display:none;" class="glass-card"></div>
    <div style="display:flex; flex-direction:column; gap:var(--space-3); margin-top:var(--space-4);">
      ${items.map(s => `
        <div class="glass-card" style="display:flex; justify-content:space-between; align-items:center; padding:var(--space-3) var(--space-4);">
          <div>
            <strong>${s.icon} ${s.title}</strong> - starting price: $${s.startingPrice}
            <div style="font-size:var(--font-size-xs); color:var(--text-secondary);">${s.description}</div>
          </div>
          <button class="btn btn-secondary" onclick="deleteCMSItem('services', '${s.id}')" style="border-color:var(--accent-tertiary); color:var(--accent-tertiary); padding:var(--space-1) var(--space-2); font-size:var(--font-size-xs);">Delete</button>
        </div>
      `).join('')}
    </div>
  `;

  window.showServiceForm = () => {
    const wrap = document.getElementById('service-form-wrapper');
    wrap.style.display = 'block';
    wrap.innerHTML = `
      <form onsubmit="handleCreateService(event)" style="padding:var(--space-4);">
        <h4 style="margin-top:0;">New Service</h4>
        <div class="form-group"><label class="form-label">Icon (Emoji)</label><input type="text" id="srv-icon" class="form-input" required /></div>
        <div class="form-group"><label class="form-label">Title</label><input type="text" id="srv-title" class="form-input" required /></div>
        <div class="form-group"><label class="form-label">Description</label><textarea id="srv-desc" class="form-textarea form-input" required></textarea></div>
        <div class="form-group"><label class="form-label">Starting Price ($)</label><input type="number" id="srv-price" class="form-input" required /></div>
        <button type="submit" class="btn btn-primary">Save Service</button>
        <button type="button" class="btn btn-secondary" onclick="document.getElementById('service-form-wrapper').style.display='none'">Cancel</button>
      </form>
    `;
  };

  window.handleCreateService = async (e) => {
    e.preventDefault();
    const icon = (document.getElementById('srv-icon') as HTMLInputElement).value;
    const title = (document.getElementById('srv-title') as HTMLInputElement).value;
    const description = (document.getElementById('srv-desc') as HTMLTextAreaElement).value;
    const startingPrice = parseFloat((document.getElementById('srv-price') as HTMLInputElement).value);

    try {
      await fetch(`${API_BASE}/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ icon, title, description, startingPrice })
      });
      window.switchCMSTab('services');
    } catch (err) {
      console.error(err);
    }
  };
}

function renderPortfolioCMS(items, el) {
  el.innerHTML = `
    <button class="btn btn-primary" onclick="showPortfolioForm()" style="margin-bottom:var(--space-4);">Add Portfolio Item</button>
    <div id="portfolio-form-wrapper" style="display:none;" class="glass-card"></div>
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:var(--space-4); margin-top:var(--space-4);">
      ${items.map(p => `
        <div class="glass-card" style="padding:var(--space-4); display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <img src="${p.coverImage}" style="width:100%; height:120px; object-fit:cover; border-radius:var(--radius-sm); margin-bottom:var(--space-2);" />
            <strong>${p.title}</strong>
            <div style="font-size:var(--font-size-xs); color:var(--text-secondary); margin-top:var(--space-1);">${p.description}</div>
            <div style="font-size:10px; color:var(--text-tertiary); margin-top:var(--space-2);">Category: ${p.category} | Tech: ${p.technologies.join(', ')}</div>
          </div>
          <button class="btn btn-secondary" onclick="deleteCMSItem('portfolio', '${p.id}')" style="border-color:var(--accent-tertiary); color:var(--accent-tertiary); margin-top:var(--space-3); padding:var(--space-1) var(--space-2); font-size:var(--font-size-xs); width:100%;">Delete</button>
        </div>
      `).join('')}
    </div>
  `;

  window.showPortfolioForm = () => {
    const wrap = document.getElementById('portfolio-form-wrapper');
    wrap.style.display = 'block';
    wrap.innerHTML = `
      <form onsubmit="handleCreatePortfolio(event)" style="padding:var(--space-4);">
        <h4 style="margin-top:0;">New Portfolio Project</h4>
        <div class="form-group"><label class="form-label">Title</label><input type="text" id="port-title" class="form-input" required /></div>
        <div class="form-group"><label class="form-label">Description</label><textarea id="port-desc" class="form-textarea form-input" required></textarea></div>
        <div class="form-group"><label class="form-label">Category</label><input type="text" id="port-cat" class="form-input" placeholder="Web App, Mobile, E-Commerce" required /></div>
        <div class="form-group"><label class="form-label">Cover Image URL</label><input type="text" id="port-img" class="form-input" placeholder="https://..." required /></div>
        <div class="form-group"><label class="form-label">Technologies (comma separated)</label><input type="text" id="port-tech" class="form-input" placeholder="Next.js, Tailwind, GraphQL" required /></div>
        <button type="submit" class="btn btn-primary">Save Project</button>
        <button type="button" class="btn btn-secondary" onclick="document.getElementById('portfolio-form-wrapper').style.display='none'">Cancel</button>
      </form>
    `;
  };

  window.handleCreatePortfolio = async (e) => {
    e.preventDefault();
    const title = (document.getElementById('port-title') as HTMLInputElement).value;
    const description = (document.getElementById('port-desc') as HTMLTextAreaElement).value;
    const category = (document.getElementById('port-cat') as HTMLInputElement).value;
    const coverImage = (document.getElementById('port-img') as HTMLInputElement).value;
    const technologies = (document.getElementById('port-tech') as HTMLInputElement).value.split(',').map(t => t.trim());

    try {
      await fetch(`${API_BASE}/portfolio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ title, description, category, coverImage, technologies, gallery: [coverImage] })
      });
      window.switchCMSTab('portfolio');
    } catch (err) {
      console.error(err);
    }
  };
}

function renderBlogCMS(items, el) {
  el.innerHTML = `
    <button class="btn btn-primary" onclick="showBlogForm()" style="margin-bottom:var(--space-4);">New Article</button>
    <div id="blog-form-wrapper" style="display:none;" class="glass-card"></div>
    <div style="display:flex; flex-direction:column; gap:var(--space-3); margin-top:var(--space-4);">
      ${items.map(b => `
        <div class="glass-card" style="display:flex; justify-content:space-between; align-items:center; padding:var(--space-3) var(--space-4);">
          <div>
            <strong>${b.title}</strong>
            <span class="badge" style="background:${b.published ? 'rgba(0,212,170,0.1)' : 'rgba(255,107,157,0.1)'}; margin-left:var(--space-2);">${b.published ? 'Published' : 'Draft'}</span>
          </div>
          <button class="btn btn-secondary" onclick="deleteCMSItem('blog', '${b.id}')" style="border-color:var(--accent-tertiary); color:var(--accent-tertiary); padding:var(--space-1) var(--space-2); font-size:var(--font-size-xs);">Delete</button>
        </div>
      `).join('')}
    </div>
  `;

  window.showBlogForm = () => {
    const wrap = document.getElementById('blog-form-wrapper');
    wrap.style.display = 'block';
    wrap.innerHTML = `
      <form onsubmit="handleCreateBlog(event)" style="padding:var(--space-4);">
        <h4 style="margin-top:0;">New Blog Post</h4>
        <div class="form-group"><label class="form-label">Title</label><input type="text" id="blog-title" class="form-input" required /></div>
        <div class="form-group"><label class="form-label">Excerpt / Short Description</label><textarea id="blog-excerpt" class="form-textarea form-input" required></textarea></div>
        <div class="form-group"><label class="form-label">Full Markdown Content</label><textarea id="blog-content" class="form-textarea form-input" style="min-height:150px;" required></textarea></div>
        <div class="form-group"><label class="form-label">Cover Image URL</label><input type="text" id="blog-img" class="form-input" required /></div>
        <div class="form-group" style="display:flex; align-items:center; gap:var(--space-2);">
          <input type="checkbox" id="blog-pub" /> <label class="form-label" style="margin:0;">Publish immediately</label>
        </div>
        <button type="submit" class="btn btn-primary">Save Post</button>
        <button type="button" class="btn btn-secondary" onclick="document.getElementById('blog-form-wrapper').style.display='none'">Cancel</button>
      </form>
    `;
  };

  window.handleCreateBlog = async (e) => {
    e.preventDefault();
    const title = (document.getElementById('blog-title') as HTMLInputElement).value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const content = (document.getElementById('blog-content') as HTMLTextAreaElement).value;
    const coverImage = (document.getElementById('blog-img') as HTMLInputElement).value;
    const published = (document.getElementById('blog-pub') as HTMLInputElement).checked;

    try {
      await fetch(`${API_BASE}/blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ title, slug, content, coverImage, published })
      });
      window.switchCMSTab('blog');
    } catch (err) {
      console.error(err);
    }
  };
}

function renderReviewsCMS(items, el) {
  el.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:var(--space-3);">
      ${items.length === 0 ? '<div style="color:var(--text-tertiary); text-align:center; padding:var(--space-4);">No reviews submitted.</div>' : items.map(r => `
        <div class="glass-card" style="display:flex; justify-content:space-between; align-items:center; padding:var(--space-3) var(--space-4); opacity:${r.approved ? '1' : '0.7'};">
          <div>
            <strong>Client ID: ${r.userId}</strong> | Rating: ${'★'.repeat(r.rating)}
            <div style="font-size:var(--font-size-xs); color:var(--text-secondary); margin-top:var(--space-1);">${r.comment}</div>
          </div>
          <div style="display:flex; gap:var(--space-2);">
            ${!r.approved ? `<button class="btn btn-primary" onclick="approveReviewCMS('${r.id}')" style="padding:var(--space-1) var(--space-2); font-size:var(--font-size-xs);">Approve</button>` : ''}
            <button class="btn btn-secondary" onclick="deleteCMSItem('reviews', '${r.id}')" style="border-color:var(--accent-tertiary); color:var(--accent-tertiary); padding:var(--space-1) var(--space-2); font-size:var(--font-size-xs);">Delete</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  window.approveReviewCMS = async (id) => {
    try {
      await fetch(`${API_BASE}/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      window.switchCMSTab('reviews');
    } catch (err) {
      console.error(err);
    }
  };
}

function renderContactsCMS(items, el) {
  el.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:var(--space-3);">
      ${items.length === 0 ? '<div style="color:var(--text-tertiary); text-align:center; padding:var(--space-4);">No contact requests received.</div>' : items.map(c => `
        <div class="glass-card" style="padding:var(--space-4);">
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:var(--font-size-sm); margin-bottom:var(--space-2);">
            <strong>${c.name}</strong>
            <span style="color:var(--text-tertiary); font-size:var(--font-size-xs);">${new Date(c.createdAt).toLocaleString()}</span>
          </div>
          <div style="font-size:var(--font-size-xs); color:var(--text-secondary); margin-bottom:var(--space-2);">Email: ${c.email} | Subject: ${c.subject}</div>
          <p style="font-size:var(--font-size-sm); color:var(--text-primary); margin:0;">${c.message}</p>
        </div>
      `).join('')}
    </div>
  `;
}

// Global Delete CMS
window.deleteCMSItem = async function(resource, id) {
  if (!confirm(`Are you sure you want to delete this ${resource} item?`)) return;
  try {
    const res = await fetch(`${API_BASE}/${resource}/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    if (!res.ok) throw new Error();
    window.switchCMSTab(resource);
  } catch (err) {
    console.error(err);
  }
};


