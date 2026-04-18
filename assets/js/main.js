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

  // Logic 7: Mobile Bottom Sheet Logic (Apply Job & Portfolio)
  const applyBtns = document.querySelectorAll('.btn-apply');
  const applySuccessSheet = document.getElementById('applySuccessSheet');
  const viewApply = document.getElementById('view-apply');
  const viewFeed = document.getElementById('view-feed');
  const btnBackToFeed = document.getElementById('btn-back-to-feed');
  
  const editPortfolioSheet = document.getElementById('editPortfolioSheet');
  const btnEditPortfolio = document.getElementById('btn-edit-portfolio');
  const btnReviewEdit = document.getElementById('btn-review-edit');
  const btnConfirmApply = document.getElementById('btn-confirm-apply');
  const btnSavePortfolio = document.getElementById('btn-save-portfolio');
  
  const closeSheetBtns = document.querySelectorAll('.close-sheet');
  const allSheets = document.querySelectorAll('.bottom-sheet-overlay');

  // Helper to close all sheets
  const closeAllSheets = () => {
    allSheets.forEach(sheet => sheet.classList.remove('active'));
  };

  // 1. Click Apply -> Open Apply View
  if(applyBtns.length > 0 && viewApply) {
    applyBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Use showSubView if defined, otherwise fallback
        if (typeof showSubView === 'function') {
          showSubView(viewApply);
        } else {
          document.querySelectorAll('.mobile-view').forEach(view => view.classList.remove('active'));
          viewApply.classList.add('active');
          if (document.querySelector('.mobile-nav')) {
            document.querySelector('.mobile-nav').style.display = 'none';
          }
        }
      });
    });
  }

  // Back button in Apply View
  if(btnBackToFeed && viewApply && viewFeed) {
    btnBackToFeed.addEventListener('click', () => {
      viewApply.classList.remove('active');
      viewFeed.classList.add('active');
      if (document.querySelector('.mobile-nav')) {
        document.querySelector('.mobile-nav').style.display = '';
      }
    });
  }

  // 2. Click Confirm Apply -> Open Success
  if(btnConfirmApply && applySuccessSheet) {
    btnConfirmApply.addEventListener('click', () => {
      applySuccessSheet.classList.add('active');
      
      setTimeout(() => {
        applySuccessSheet.classList.remove('active');
        // Auto return to feed
        if (viewApply) viewApply.classList.remove('active');
        if (viewFeed) viewFeed.classList.add('active');
        if (document.querySelector('.mobile-nav')) document.querySelector('.mobile-nav').style.display = '';
        
        // Reset check boxes
        const agreeCheckboxes = document.querySelectorAll('.apply-checkbox');
        agreeCheckboxes.forEach(cb => cb.checked = false);
        btnConfirmApply.disabled = true;
        btnConfirmApply.style.opacity = '0.5';
        btnConfirmApply.style.pointerEvents = 'none';
      }, 2500); // 2.5s delay to read success message
    });
  }

  // 3. Click Edit Portfolio -> Navigate to Edit Profile View
  const viewEditProfile = document.getElementById('view-edit-profile');
  const mobileNav = document.querySelector('.mobile-nav');

  const showSubView = (targetView) => {
    document.querySelectorAll('.mobile-view').forEach(v => v.classList.remove('active'));
    if (targetView) targetView.classList.add('active');
    if (mobileNav) mobileNav.style.display = 'none';
  };

  const backToPortfolio = () => {
    document.querySelectorAll('.mobile-view').forEach(v => v.classList.remove('active'));
    const vPortfolio = document.getElementById('view-portfolio');
    if (vPortfolio) vPortfolio.classList.add('active');
    if (mobileNav) mobileNav.style.display = '';
  };

  if (btnEditPortfolio) {
    btnEditPortfolio.addEventListener('click', () => showSubView(viewEditProfile));
  }
  if (btnReviewEdit) {
    btnReviewEdit.addEventListener('click', () => showSubView(viewEditProfile));
  }

  // 4. Click Save Portfolio -> Go back, Show Toast
  if (btnSavePortfolio) {
    btnSavePortfolio.addEventListener('click', () => {
      backToPortfolio();
      if (typeof showToast === 'function') showToast('Cập nhật hồ sơ thành công!', 'success');
    });
  }

  // Close buttons and overlay click
  closeSheetBtns.forEach(btn => {
    btn.addEventListener('click', closeAllSheets);
  });

  allSheets.forEach(sheet => {
    sheet.addEventListener('click', (e) => {
      if(e.target === sheet) {
        sheet.classList.remove('active');
      }
    });
  });

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

  // Logic 9: Apply Form Validation & Calculation
  const applyBudgetInput = document.getElementById('apply-budget-input');
  const feeAmountEl = document.getElementById('fee-amount');
  const netAmountEl = document.getElementById('net-amount');
  const agreeCheckboxes = document.querySelectorAll('.apply-checkbox');

  const validateApplyForm = () => {
    if(!btnConfirmApply) return;
    
    let allChecked = true;
    agreeCheckboxes.forEach(cb => {
      if (!cb.checked) allChecked = false;
    });

    const budgetVal = applyBudgetInput ? parseFloat(applyBudgetInput.value) : 0;
    
    if (allChecked && budgetVal > 0) {
      btnConfirmApply.disabled = false;
      btnConfirmApply.style.opacity = '1';
      btnConfirmApply.style.pointerEvents = 'auto';
    } else {
      btnConfirmApply.disabled = true;
      btnConfirmApply.style.opacity = '0.5';
      btnConfirmApply.style.pointerEvents = 'none';
    }
  };

  if (applyBudgetInput) {
    applyBudgetInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value) || 0;
      const fee = val * 0.1; // 10%
      const net = val - fee;
      
      if(feeAmountEl) feeAmountEl.innerText = `- ${fee.toLocaleString('vi-VN')}đ`;
      if(netAmountEl) netAmountEl.innerText = `${net.toLocaleString('vi-VN')}đ`;
      
      validateApplyForm();
    });
  }

  if (agreeCheckboxes.length > 0) {
    agreeCheckboxes.forEach(cb => cb.addEventListener('change', validateApplyForm));
  }

  // Logic 10: KOC Public Profile View (SME App)
  const btnViewKocProfile = document.getElementById('btn-view-koc-profile');
  const viewKocProfile = document.getElementById('view-koc-profile');
  
  if (btnViewKocProfile && viewKocProfile) {
    btnViewKocProfile.addEventListener('click', () => {
      if (typeof showSubView === 'function') {
        showSubView(viewKocProfile);
      } else {
        document.querySelectorAll('.mobile-view').forEach(view => view.classList.remove('active'));
        viewKocProfile.classList.add('active');
        if (document.querySelector('.mobile-nav')) {
          document.querySelector('.mobile-nav').style.display = 'none';
        }
      }
    });
  }

  // Logic 10b: Back button from KOC Profile
  const btnBackToSearch = document.querySelector('.btn-back-to-search');
  const viewSmeSearch = document.getElementById('view-sme-search');
  if (btnBackToSearch && viewKocProfile && viewSmeSearch) {
    btnBackToSearch.addEventListener('click', () => {
      viewKocProfile.classList.remove('active');
      viewSmeSearch.classList.add('active');
      if (document.querySelector('.mobile-nav')) {
        document.querySelector('.mobile-nav').style.display = '';
      }
    });
  }

  // Handle Profile Tabs
  const profileTabBtns = document.querySelectorAll('.profile-tab-btn');
  const profileTabContents = document.querySelectorAll('.profile-tab-content');

  if (profileTabBtns.length > 0) {
    profileTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Reset all buttons
        profileTabBtns.forEach(b => {
          b.classList.remove('active');
          b.style.borderBottomColor = 'transparent';
          b.style.color = 'var(--text-secondary)';
        });
        
        // Active clicked button
        btn.classList.add('active');
        btn.style.borderBottomColor = 'var(--primary-500)';
        btn.style.color = 'var(--primary-600)';

        // Hide all contents
        profileTabContents.forEach(content => {
          content.style.display = 'none';
          content.classList.remove('active');
        });

        // Show target content
        const targetId = btn.getAttribute('data-tab');
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.style.display = 'block';
          setTimeout(() => {
            targetContent.classList.add('active');
          }, 10);
        }
      });
    });
  }

  // Logic 11: Portfolio Select Change
  const portfolioSelect = document.getElementById('portfolio-select');
  if (portfolioSelect) {
    portfolioSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      const title = document.getElementById('portfolio-title');
      const stats = document.getElementById('portfolio-stats');
      const icon = document.getElementById('portfolio-icon');
      const avatarBg = document.getElementById('portfolio-avatar-bg');
      const badge = document.getElementById('portfolio-auto-badge');

      if (val === 'tiktok-food') {
        if(title) title.innerText = 'TikTok - Ẩm thực';
        if(stats) stats.innerText = '120K Followers • 50K View TB';
        if(icon) icon.innerText = '🎵';
        if(avatarBg) avatarBg.style.background = 'linear-gradient(135deg, #f59e0b, #ef4444)';
        if(badge) badge.style.display = 'block';
      } else if (val === 'insta-fashion') {
        if(title) title.innerText = 'Instagram - Thời trang';
        if(stats) stats.innerText = '85K Followers • 15% Tương tác';
        if(icon) icon.innerText = '📷';
        if(avatarBg) avatarBg.style.background = 'linear-gradient(135deg, #ec4899, #8b5cf6)';
        if(badge) badge.style.display = 'none';
      } else if (val === 'fb-general') {
        if(title) title.innerText = 'Facebook - General';
        if(stats) stats.innerText = '50K Followers • 20K View TB';
        if(icon) icon.innerText = '📘';
        if(avatarBg) avatarBg.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
        if(badge) badge.style.display = 'none';
      }
    });
  }

  // Logic 12: Portfolio Platform Tabs (TikTok / Instagram)
  const portfolioTabBtns = document.querySelectorAll('.portfolio-tab-btn');
  if (portfolioTabBtns.length > 0) {
    portfolioTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-ptab');
        portfolioTabBtns.forEach(b => {
          b.classList.remove('active');
          b.style.borderBottomColor = 'transparent';
          b.style.color = 'var(--text-tertiary)';
        });
        btn.classList.add('active');
        btn.style.borderBottomColor = 'var(--primary-500)';
        btn.style.color = 'var(--primary-600)';
        document.querySelectorAll('.portfolio-tab-content').forEach(c => c.style.display = 'none');
        const target = document.getElementById(targetId);
        if (target) target.style.display = 'block';
      });
    });
  }

  // Logic 13: Manage Job Status Tabs
  const manageTabBtns = document.querySelectorAll('.manage-tab-btn');
  if (manageTabBtns.length > 0) {
    manageTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-mtab');
        manageTabBtns.forEach(b => {
          b.classList.remove('active');
          b.style.borderBottomColor = 'transparent';
          b.style.color = 'var(--text-tertiary)';
        });
        btn.classList.add('active');
        btn.style.borderBottomColor = 'var(--primary-500)';
        btn.style.color = 'var(--primary-600)';
        document.querySelectorAll('.manage-tab-content').forEach(c => c.style.display = 'none');
        const target = document.getElementById(targetId);
        if (target) target.style.display = 'block';
      });
    });
  }

  // Logic 14: View Brief Sheet
  const btnViewBrief = document.getElementById('btn-view-brief');
  const briefSheet = document.getElementById('briefSheet');
  if (btnViewBrief && briefSheet) {
    btnViewBrief.addEventListener('click', (e) => {
      e.preventDefault();
      briefSheet.classList.add('active');
    });
  }
  // Logic 15: Withdraw & Transactions Views (with nav hide/show)
  const btnWithdraw = document.getElementById('btn-open-withdraw');
  const btnTransactions = document.getElementById('btn-open-transactions');
  const viewWithdraw = document.getElementById('view-withdraw');
  const viewTransactions = document.getElementById('view-transactions');
  const btnsBackToPortfolio = document.querySelectorAll('.btn-back-to-portfolio');

  if (btnWithdraw && viewWithdraw) {
    btnWithdraw.addEventListener('click', () => showSubView(viewWithdraw));
  }

  if (btnTransactions && viewTransactions) {
    btnTransactions.addEventListener('click', (e) => {
      e.preventDefault();
      showSubView(viewTransactions);
    });
  }

  if (btnsBackToPortfolio.length > 0) {
    btnsBackToPortfolio.forEach(btn => {
      btn.addEventListener('click', () => backToPortfolio());
    });
  }

  const btnEditBank = document.getElementById('btn-edit-bank');
  const btnSaveBank = document.getElementById('btn-save-bank');
  const withdrawBankForm = document.getElementById('withdraw-bank-form');
  const withdrawBankDisplay = document.getElementById('withdraw-bank-display');

  if (btnEditBank && withdrawBankForm && withdrawBankDisplay) {
    btnEditBank.addEventListener('click', () => {
      withdrawBankDisplay.style.display = 'none';
      withdrawBankForm.style.display = 'block';
    });
  }

  if (btnSaveBank && withdrawBankForm && withdrawBankDisplay) {
    btnSaveBank.addEventListener('click', () => {
      withdrawBankForm.style.display = 'none';
      withdrawBankDisplay.style.display = 'block';
      showToast('Cập nhật thông tin ngân hàng thành công!', 'success');
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

// Logic 11: Mobile Login Screen Switching
document.addEventListener('DOMContentLoaded', () => {
  // KOC App Login
  const btnKocLogin = document.getElementById('btn-koc-login');
  if(btnKocLogin) {
    btnKocLogin.addEventListener('click', () => {
      document.getElementById('view-koc-login').classList.remove('active');
      document.getElementById('view-feed').classList.add('active');
      const nav = document.getElementById('koc-mobile-nav');
      if(nav) nav.style.display = 'flex';
      showToast('Đăng nhập KOC thành công!', 'success');
    });
  }

  // SME App Login
  const btnSmeLogin = document.getElementById('btn-sme-login');
  if(btnSmeLogin) {
    btnSmeLogin.addEventListener('click', () => {
      document.getElementById('view-sme-login').classList.remove('active');
      document.getElementById('view-sme-home').classList.add('active');
      const nav = document.getElementById('sme-mobile-nav');
      if(nav) nav.style.display = 'flex';
      showToast('Đăng nhập Quản trị thành công!', 'success');
    });
  }
});
