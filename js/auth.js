// js/auth.js
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const userStatus = document.getElementById('user-status');
    
    // Check auth state
    auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in
            if (userStatus) {
                userStatus.textContent = `Welcome, ${user.displayName || user.email || 'Guest'}!`;
            }
            
            if (loginBtn) loginBtn.classList.add('hidden');
            if (logoutBtn) logoutBtn.classList.remove('hidden');
        } else {
            // User is signed out
            if (userStatus) {
                userStatus.textContent = 'You are not logged in.';
            }
            
            if (loginBtn) loginBtn.classList.remove('hidden');
            if (logoutBtn) logoutBtn.classList.add('hidden');
        }
    });
    
    // Login button
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = window.location.pathname.includes('pages') ? 'login.html' : 'pages/login.html';
        });
    }
    
    // Logout button
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            auth.signOut().then(() => {
                console.log('User signed out');
            }).catch(error => {
                console.error('Error signing out:', error);
            });
        });
    }
});