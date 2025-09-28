// Toggle between forms
function showSignIn() {
  document.getElementById('signin-form').classList.add('active');
  document.getElementById('otp-mobile-form').classList.remove('active');
  document.getElementById('otp-code-form').classList.remove('active');
}

function showOtpMobile() {
  document.getElementById('signin-form').classList.remove('active');
  document.getElementById('otp-mobile-form').classList.add('active');
  document.getElementById('otp-code-form').classList.remove('active');
}

function showOtpCode() {
  document.getElementById('signin-form').classList.remove('active');
  document.getElementById('otp-mobile-form').classList.remove('active');
  document.getElementById('otp-code-form').classList.add('active');
}

// Password/OTP reveal
function togglePassword(id, elem) {
  const input = document.getElementById(id);
  if(input.type === "password" || input.type === "text") {
    input.type = input.type === "password" ? "text" : "password";
    elem.textContent = input.type === "password" ? "👁️" : "🙈";
  }
}

// On load, show sign-in form
showSignIn();

// Handle form submissions to show dashboard
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('auth-interface').style.display = 'none';
    document.getElementById('dashboard').classList.remove('hidden');
  });
});

// Toggle sidebar for mobile
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('open');
}

// Make table editable
document.addEventListener('DOMContentLoaded', function() {
  const editIcons = document.querySelectorAll('.edit');
  editIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const row = this.closest('tr');
      const cells = row.querySelectorAll('td');
      const isEditing = this.innerHTML === '&#128190;'; // if save icon, means currently editing
      cells.forEach((cell, index) => {
        if (index === 5) { // status column
          const statusSpan = cell.querySelector('.status');
          if (!isEditing) {
            // Enter edit mode: replace span with select
            const select = document.createElement('select');
            select.innerHTML = `
              <option value="New">New</option>
              <option value="In-progress">In-progress</option>
              <option value="Completed">Completed</option>
            `;
            select.value = statusSpan.textContent;
            // Copy styles from status span to make select look similar
            const computedStyle = window.getComputedStyle(statusSpan);
            select.style.background = computedStyle.background;
            select.style.color = computedStyle.color;
            select.style.border = computedStyle.border;
            select.style.borderRadius = computedStyle.borderRadius;
            select.style.padding = computedStyle.padding;
            select.style.fontSize = computedStyle.fontSize;
            select.style.fontWeight = computedStyle.fontWeight;
            // Update styles on change
            select.addEventListener('change', function() {
              const selected = this.value;
              const className = 'status ' + selected.toLowerCase().replace('-', '-');
              const tempSpan = document.createElement('span');
              tempSpan.className = className;
              document.body.appendChild(tempSpan);
              const newComputedStyle = window.getComputedStyle(tempSpan);
              this.style.background = newComputedStyle.background;
              this.style.color = newComputedStyle.color;
              document.body.removeChild(tempSpan);
            });
            cell.innerHTML = '';
            cell.appendChild(select);
          } else {
            // Exit edit mode: replace select with span
            const select = cell.querySelector('select');
            const selectedValue = select.value;
            const statusSpan = document.createElement('span');
            statusSpan.className = 'status ' + selectedValue.toLowerCase().replace('-', '-');
            statusSpan.textContent = selectedValue;
            cell.innerHTML = '';
            cell.appendChild(statusSpan);
          }
        } else if (index > 0 && index < cells.length - 1 && index !== 5) { // other editable cells, skip checkbox, edit, and status
          cell.contentEditable = isEditing ? 'false' : 'true';
        }
      });
      // Toggle icon between edit and save
      this.innerHTML = this.innerHTML === '&#9998;' ? '&#128190;' : '&#9998;';
    });
  });
});
