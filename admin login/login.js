// Add event listener for the login form submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Get the input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if the credentials are correct
    if (username === 'kali' && password === 'appadmin') {
        // Navigate to the new page
        window.location.href = 'admin.html'; // Redirect to admin page
    } else {
        // Show an error dialog if credentials are incorrect
        alert('Invalid username or password'); // Display an error message
    }
});
