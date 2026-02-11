// ==================== DOM ELEMENTS ==================== 
const profileBtn = document.getElementById('profileBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const notificationBtn = document.getElementById('notificationBtn');
const notificationPanel = document.getElementById('notificationPanel');
const closeNotification = document.getElementById('closeNotification');
const sidebarItems = document.querySelectorAll('.menu-item');
const contentSections = document.querySelectorAll('.content-section');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const bookAppointmentBtn = document.getElementById('bookAppointmentBtn');
const bookAppointmentBtns = document.querySelectorAll('.book-appointment-btn');
const bookAppointmentModal = document.getElementById('bookAppointmentModal');
const closeBookModal = document.getElementById('closeBookModal');
const proceedPaymentBtn = document.getElementById('proceedPaymentBtn');
const esewayPaymentModal = document.getElementById('esewayPaymentModal');
const closePaymentModal = document.getElementById('closePaymentModal');
const cancelPaymentBtn = document.getElementById('cancelPaymentBtn');
const payWithEsewaBtn = document.getElementById('payWithEsewaBtn');
const profileModal = document.getElementById('profileModal');
const changePasswordModal = document.getElementById('changePasswordModal');
const notificationsModal = document.getElementById('notificationsModal');
const successModal = document.getElementById('successModal');
const successOkBtn = document.getElementById('successOkBtn');
const ratingStars = document.querySelectorAll('.rating-input i');
const feedbackForm = document.querySelector('.feedback-form');
const profileForm = document.querySelector('.profile-form');
const passwordForm = document.querySelector('.password-form');
const notificationsForm = document.querySelector('.notifications-form');
const bookingForm = document.querySelector('.booking-form');
const togglePasswordBtns = document.querySelectorAll('.toggle-password');

// ==================== DROPDOWN MENU ==================== 
profileBtn.addEventListener('click', () => {
    dropdownMenu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-profile-menu')) {
        dropdownMenu.classList.remove('active');
    }
});

// ==================== NOTIFICATION PANEL ==================== 
notificationBtn.addEventListener('click', () => {
    notificationPanel.classList.toggle('active');
});

closeNotification.addEventListener('click', () => {
    notificationPanel.classList.remove('active');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.notification-panel') && !e.target.closest('.notification-btn')) {
        notificationPanel.classList.remove('active');
    }
});

// ==================== SIDEBAR NAVIGATION ==================== 
sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
        sidebarItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        const sectionId = item.getAttribute('data-section');
        showSection(sectionId);
    });
});

function showSection(sectionId) {
    contentSections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// ==================== TABS ==================== 
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(tabName).classList.add('active');
    });
});

// ==================== MODALS ==================== 
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Book Appointment Modal
bookAppointmentBtn.addEventListener('click', () => openModal(bookAppointmentModal));
bookAppointmentBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const doctorName = e.target.getAttribute('data-doctor');
        document.getElementById('doctor-name').value = doctorName;
        openModal(bookAppointmentModal);
    });
});
closeBookModal.addEventListener('click', () => closeModal(bookAppointmentModal));

// eSewa Payment Modal
proceedPaymentBtn.addEventListener('click', () => {
    closeModal(bookAppointmentModal);
    openModal(esewayPaymentModal);
});
closePaymentModal.addEventListener('click', () => closeModal(esewayPaymentModal));
cancelPaymentBtn.addEventListener('click', () => closeModal(esewayPaymentModal));

// Close modals on background click
[bookAppointmentModal, esewayPaymentModal, profileModal, changePasswordModal, notificationsModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
});

// ==================== DROPDOWN MENU ACTIONS ==================== 
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        dropdownMenu.classList.remove('active');
        
        const href = item.getAttribute('href');
        if (href === '#profile') {
            openModal(profileModal);
        } else if (href === '#change-password') {
            openModal(changePasswordModal);
        } else if (href === '#notifications') {
            openModal(notificationsModal);
        } else if (href === '#logout') {
            handleLogout();
        } else {
            showSection(href.substring(1));
        }
    });
});

// ==================== RATING STARS ==================== 
ratingStars.forEach(star => {
    star.addEventListener('click', () => {
        const value = star.getAttribute('data-value');
        document.getElementById('rating').value = value;
        
        ratingStars.forEach(s => {
            if (s.getAttribute('data-value') <= value) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });
    
    star.addEventListener('mouseover', () => {
        const value = star.getAttribute('data-value');
        ratingStars.forEach(s => {
            if (s.getAttribute('data-value') <= value) {
                s.style.color = '#ffc107';
            } else {
                s.style.color = '#ddd';
            }
        });
    });
});

document.querySelector('.rating-input').addEventListener('mouseleave', () => {
    updateRatingDisplay();
});

function updateRatingDisplay() {
    const rating = document.getElementById('rating').value;
    ratingStars.forEach(star => {
        if (star.getAttribute('data-value') <= rating) {
            star.style.color = '#ffc107';
        } else {
            star.style.color = '#ddd';
        }
    });
}

// ==================== TOGGLE PASSWORD VISIBILITY ==================== 
togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const input = btn.parentElement.querySelector('input');
        const icon = btn.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// ==================== FORM SUBMISSIONS ==================== 
// Feedback Form
if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showSuccessModal('Feedback Submitted', 'Thank you! Your feedback has been submitted successfully.');
        feedbackForm.reset();
    });
}

// Profile Form
if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        closeModal(profileModal);
        showSuccessModal('Profile Updated', 'Your profile information has been updated successfully.');
        profileForm.reset();
    });
}

// Password Form
if (passwordForm) {
    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if (newPassword.length < 8) {
            alert('Password must be at least 8 characters long!');
            return;
        }
        
        closeModal(changePasswordModal);
        showSuccessModal('Password Changed', 'Your password has been changed successfully.');
        passwordForm.reset();
    });
}

// Notifications Form
if (notificationsForm) {
    notificationsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        closeModal(notificationsModal);
        showSuccessModal('Settings Updated', 'Your notification settings have been updated successfully.');
    });
}

// Booking Form & eSewa Payment
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Form will proceed to payment modal on button click
    });
}

// eSewa Payment Handler
payWithEsewaBtn.addEventListener('click', () => {
    const email = document.getElementById('esewa-email').value;
    const phone = document.getElementById('esewa-phone').value;
    const doctorName = document.getElementById('doctor-name').value;
    const appointmentDate = document.getElementById('appointment-date').value;
    const appointmentTime = document.getElementById('appointment-time').value;
    
    if (!email || !phone) {
        alert('Please fill in all required fields!');
        return;
    }
    
    // Simulate eSewa payment (in real app, would integrate with eSewa API)
    console.log('Processing eSewa payment:', {
        email,
        phone,
        doctor: doctorName,
        date: appointmentDate,
        time: appointmentTime,
        amount: 'NPR 500'
    });
    
    // Send email notification
    sendAppointmentConfirmation({
        doctor: doctorName,
        date: appointmentDate,
        time: appointmentTime,
        email: email
    });
    
    closeModal(esewayPaymentModal);
    showSuccessModal('Payment Successful', 'Your appointment has been booked successfully! You will receive a confirmation email shortly.');
    bookingForm.reset();
});

// ==================== SUCCESS MODAL ==================== 
function showSuccessModal(title, message) {
    document.getElementById('successTitle').textContent = title;
    document.getElementById('successMessage').textContent = message;
    openModal(successModal);
}

successOkBtn.addEventListener('click', () => {
    closeModal(successModal);
});

// ==================== LOGOUT ==================== 
function handleLogout() {
    // Simulate logout (in real app, would send to server)
    alert('You have been logged out successfully!');
    // window.location.href = '/login'; // Redirect to login page
}

// ==================== EMAIL NOTIFICATIONS ==================== 
// Simulated email notifications
function sendEmailNotification(type, recipient, details) {
    console.log(`📧 Email Notification Sent:`);
    console.log(`Type: ${type}`);
    console.log(`To: ${recipient}`);
    console.log(`Details:`, details);
    
    // In a real application, this would make an API call to the backend
    // POST /api/notifications/send-email
    // {
    //   type: type,
    //   recipient: recipient,
    //   details: details
    // }
}

// Example: Send appointment confirmation email
function sendAppointmentConfirmation(appointmentDetails) {
    sendEmailNotification('APPOINTMENT_CONFIRMATION', appointmentDetails.email, {
        doctorName: appointmentDetails.doctor,
        appointmentDate: appointmentDetails.date,
        appointmentTime: appointmentDetails.time,
        consultationType: 'In-Person',
        bookingReference: 'APT-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    });
}

// Example: Send report available email
function sendReportAvailableEmail(reportDetails) {
    sendEmailNotification('REPORT_AVAILABLE', 'john@example.com', {
        reportType: reportDetails.type,
        reportDate: reportDetails.date,
        downloadLink: reportDetails.link
    });
}

// ==================== REAL-TIME NOTIFICATIONS ==================== 
// Simulate real-time notifications
const notificationList = document.querySelector('.notification-list');

function addNotification(icon, title, text, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification-item unread';
    
    let iconClass = 'fa-envelope';
    if (type === 'report') iconClass = 'fa-file-medical';
    if (type === 'prescription') iconClass = 'fa-pills';
    if (type === 'appointment') iconClass = 'fa-calendar-check';
    
    notification.innerHTML = `
        <div class="notification-icon" style="background: var(--primary-color); color: white;">
            <i class="fas ${iconClass}"></i>
        </div>
        <div class="notification-content">
            <p class="notification-title">${title}</p>
            <p class="notification-text">${text}</p>
            <span class="notification-time">just now</span>
        </div>
    `;
    
    if (notificationList) {
        notificationList.insertBefore(notification, notificationList.firstChild);
    }
    
    // Update badge
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        const count = parseInt(badge.textContent) || 0;
        badge.textContent = count + 1;
    }
}

// ==================== SEARCH FUNCTIONALITY ==================== 
const searchInput = document.querySelector('.search-input');
const doctorCards = document.querySelectorAll('.doctor-card');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        doctorCards.forEach(card => {
            const doctorName = card.querySelector('h3').textContent.toLowerCase();
            const specialty = card.querySelector('.specialty').textContent.toLowerCase();
            
            if (doctorName.includes(searchTerm) || specialty.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// ==================== FILTER FUNCTIONALITY ==================== 
const filterSelect = document.querySelector('.filter-select');

if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
        const selectedSpecialty = e.target.value;
        
        doctorCards.forEach(card => {
            if (selectedSpecialty === 'All Specialties') {
                card.style.display = 'block';
            } else {
                const specialty = card.querySelector('.specialty').textContent;
                if (specialty === selectedSpecialty) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
}

// ==================== DATE INPUT VALIDATION ==================== 
const appointmentDateInput = document.getElementById('appointment-date');
if (appointmentDateInput) {
    const today = new Date().toISOString().split('T')[0];
    appointmentDateInput.setAttribute('min', today);
}

// ==================== INITIALIZE ==================== 
document.addEventListener('DOMContentLoaded', () => {
    console.log('🏥 Patient Dashboard Initialized Successfully');
    
    // Set initial active state
    if (sidebarItems.length > 0) {
        sidebarItems[0].classList.add('active');
    }
    
    // Optional: Simulate receiving a notification after page load
    setTimeout(() => {
        addNotification('fa-calendar-check', 'Appointment Confirmed', 'Your appointment with Dr. Sarah Smith has been confirmed for Feb 14, 2026 at 2:00 PM', 'appointment');
    }, 2000);
    
    // Log Material-UI icons integration
    console.log('✅ Material-UI Icons Integrated');
    console.log('✅ NotificationsNoneIcon (Bell) - Notification Button');
    console.log('✅ AccountCircleIcon (Profile) - Profile Button');
});

// ==================== RESPONSIVE MENU TOGGLE ==================== 
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('mobile-open');
    }
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('mobile-open');
        }
    }
});