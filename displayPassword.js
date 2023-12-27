document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById('passwordInput');
    const togglePassword = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');

    // Function to toggle password visibility
    togglePassword.addEventListener('mousedown', function() {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    });

    togglePassword.addEventListener('mouseup', function() {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    });

    togglePassword.addEventListener('mouseleave', function() {
        // In case the mouse leaves the button while pressed
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    });
});
