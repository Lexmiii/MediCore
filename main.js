// ── Modal ─────────────────────────────────────────────────────────
function openModal(id) {
  const m = document.getElementById(id);
  if (m) { m.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) { m.style.display = 'none'; document.body.style.overflow = ''; }
}
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.style.display = 'none';
    document.body.style.overflow = '';
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay').forEach(m => {
      m.style.display = 'none';
    });
    document.body.style.overflow = '';
  }
});

// ── Toast ─────────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type] || '✓'}</span> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s, transform 0.4s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ── Table Search/Filter ───────────────────────────────────────────
function filterTable(tableId, searchId, statusId) {
  const q = document.getElementById(searchId)?.value.toLowerCase() || '';
  const status = document.getElementById(statusId)?.value.toLowerCase() || '';
  document.querySelectorAll(`#${tableId} tbody tr`).forEach(row => {
    const text = row.textContent.toLowerCase();
    const matchQ = !q || text.includes(q);
    const matchS = !status || text.includes(status);
    row.style.display = matchQ && matchS ? '' : 'none';
  });
}

// ── Tabs ──────────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const group = tab.closest('.tabs');
      group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      // Hide all tab content in parent container
      const parent = group.parentElement;
      parent.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
      const target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) target.style.display = 'block';
    });
  });
}

// ── Confirm ───────────────────────────────────────────────────────
function confirmAction(msg, callback) {
  if (confirm(msg)) callback();
}

// ── Slot Picker ───────────────────────────────────────────────────
function selectSlot(btn, time) {
  document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const inp = document.getElementById('selectedTime');
  if (inp) inp.value = time;
}

// ── Set min date to today ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"].future-only').forEach(el => {
    el.min = today;
  });
  initTabs();
});
