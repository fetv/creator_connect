/**
 * JS Lõi cho UI Prototype Creator Connect
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log("Creator Connect App Initialized");

  // Logic 1: Tabs chọn Role ở màn hình Login (index.html)
  const roleButtons = document.querySelectorAll('.role-tabs .role-btn');
  if (roleButtons.length > 0) {
    roleButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Reset classes
        roleButtons.forEach(b => {
          b.classList.remove('active');
          b.classList.add('btn-ghost');
          b.style.background = 'transparent';
          b.style.color = 'var(--text-secondary)';
          b.style.boxShadow = 'none';
        });

        // Add Active styles
        const target = e.target;
        target.classList.add('active');
        target.classList.remove('btn-ghost');
        target.style.background = 'var(--bg-surface)';
        target.style.color = 'var(--primary-600)';
        target.style.boxShadow = 'var(--shadow-sm)';
      });
    });
  }

  // Logic 2: Hiệu ứng Button Ripple (Micro-interactions)
  const buttons = document.querySelectorAll('.btn-primary');
  buttons.forEach(btn => {
    btn.addEventListener('mousedown', function(e) {
      let x = e.clientX - e.target.offsetLeft;
      let y = e.clientY - e.target.offsetTop;
      
      let ripples = document.createElement('span');
      ripples.style.left = x + 'px';
      ripples.style.top = y + 'px';
      ripples.style.position = 'absolute';
      ripples.style.background = '#fff';
      ripples.style.transform = 'translate(-50%, -50%)';
      ripples.style.pointerEvents = 'none';
      ripples.style.borderRadius = '50%';
      ripples.style.animation = 'animateRipple 1s linear infinite';
      ripples.style.opacity = '0.5';
      
      // Inline keyframes equivalent for ripple
      if(!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.innerHTML = `
          @keyframes animateRipple {
            0% { width: 0px; height: 0px; opacity: 0.5; }
            100% { width: 500px; height: 500px; opacity: 0; }
          }
        `;
        document.head.appendChild(style);
      }

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripples);
      
      setTimeout(() => {
        ripples.remove();
      }, 1000);
    })
  });

  // Logic 3: Nút Duyệt Video giả lập tương tác cảnh báo ví Escrow (dashboard.html)
  const escrowButtons = document.querySelectorAll('button');
  escrowButtons.forEach(btn => {
    if(btn.innerText.includes('Xem & Duyệt')) {
      btn.addEventListener('click', () => {
        alert("XÁC NHẬN NGHIỆM THU\n\nBạn có muốn nghiệm thu video của Đức Dược Sĩ? \nHệ thống sẽ tự động giải ngân 3,000,000đ từ Ví Tạm Giữ sang tài khoản của KOC.");
      });
    }
  });

  // Logic 4: Modal (Pop-up) Toggle Logic
  const modalOpenBtns = document.querySelectorAll('[data-toggle="modal"]');
  const modalCloseBtns = document.querySelectorAll('.modal-close');

  modalOpenBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const modal = document.getElementById(targetId);
      if(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
      }
    });
  });

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = btn.closest('.modal-overlay');
      if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore background scroll
      }
    });
  });

  // Close modal when clicking outside
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if(e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Logic 5: E-Contract Mộc chữ ký số giả lập
  const signBtn = document.getElementById('btn-sign-contract');
  if(signBtn) {
    signBtn.addEventListener('click', function(e) {
      e.preventDefault();
      this.innerText = 'Đã ký (Verified)';
      this.classList.remove('btn-primary');
      this.classList.add('btn-outline');
      this.style.borderColor = 'var(--success-500)';
      this.style.color = 'var(--success-500)';
      this.disabled = true;
      
      const statusBadge = document.getElementById('contract-status');
      if(statusBadge) {
        statusBadge.innerText = 'Đã xác nhận thanh toán';
        statusBadge.className = 'badge badge-success';
      }
    });
  }

  // Logic 6: Mobile Bottom Nav Switching
  const mobileNavItems = document.querySelectorAll('.mobile-nav .nav-item');
  if(mobileNavItems.length > 0) {
    mobileNavItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-target');
        if(!targetId || targetId === '#') return; // Ignore if no target
        
        // Reset active nav item
        mobileNavItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        // Hide all views
        document.querySelectorAll('.mobile-view').forEach(view => {
          view.classList.remove('active');
        });

        // Show target view
        const targetView = document.getElementById(targetId);
        if(targetView) {
          targetView.classList.add('active');
        }
      });
    });
  }

  // Logic 7: Mobile Bottom Sheet Logic (Apply Job)
  const applyBtns = document.querySelectorAll('.btn-apply');
  const applySheet = document.getElementById('applySuccessSheet');
  const closeSheetBtns = document.querySelectorAll('.close-sheet');

  if(applyBtns.length > 0 && applySheet) {
    applyBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        applySheet.classList.add('active');
      });
    });

    closeSheetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        applySheet.classList.remove('active');
      });
    });

    // Close on overlay click
    applySheet.addEventListener('click', (e) => {
      if(e.target === applySheet) {
        applySheet.classList.remove('active');
      }
    });
  }

  // Logic 8: Handle Chat Input
  const chatInput = document.getElementById('chat-input-field');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatMessagesContainer = document.querySelector('.chat-messages');

  if(chatInput && chatSendBtn && chatMessagesContainer) {
    chatSendBtn.addEventListener('click', () => {
      const text = chatInput.value.trim();
      if(text !== '') {
        // Create new message block
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message sent';
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.innerText = text;

        const time = document.createElement('span');
        time.className = 'text-xs text-tertiary mt-1';
        time.style.alignSelf = 'flex-end';
        
        // Get current time
        const now = new Date();
        time.innerText = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');

        msgDiv.appendChild(bubble);
        msgDiv.appendChild(time);

        chatMessagesContainer.appendChild(msgDiv);
        
        // Clear input and scroll to bottom
        chatInput.value = '';
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
      }
    });

    // Handle Enter key
    chatInput.addEventListener('keypress', (e) => {
      if(e.key === 'Enter') {
        chatSendBtn.click();
      }
    });
  }

});

// Global Function: Show Toast
function showToast(message, type = 'success') {
  // Check if container exists, if not create it
  let container = document.querySelector('.toast-container');
  if(!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let icon = '✅';
  let title = 'Thành công';
  if(type === 'warning') { icon = '⚠️'; title = 'Cảnh báo'; }
  if(type === 'error') { icon = '❌'; title = 'Lỗi'; }

  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;

  container.appendChild(toast);

  // Auto remove after 3s
  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

