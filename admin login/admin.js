// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBiwMXWkkJbDbt9ghYotHyLJ_KuXlCLf10",
    authDomain: "earncash-ktg.firebaseapp.com",
    projectId: "earncash-ktg",
    storageBucket: "earncash-ktg.appspot.com",
    messagingSenderId: "956789418685",
    appId: "G-T96ZJT4LSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to fetch user data from Firebase Realtime Database
async function fetchUserData(searchQuery = '') {
    const userDataBody = document.getElementById('user-data-body');
    const totalUsersOverview = document.getElementById('total-users-overview');
    userDataBody.innerHTML = ''; // Clear existing data

    // Reference to the user data in Firebase Realtime Database
    const dbRef = ref(database);
    let totalUsersCount = 0; // Counter for total users

    try {
        const snapshot = await get(child(dbRef, 'app_user')); // Fetch data from the 'app_user' path
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val(); // Get data from each child node
                
                // If there is a search query, filter the user by phone number
                if (searchQuery && data.number !== searchQuery) {
                    return; // Skip this user if it doesn't match the search query
                }
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${data.name}</td>
                    <td>${data.age}</td>
                    <td>${data.number}</td>
                    <td>${data.password}</td>
                    <td>${data.plan}</td>
                    <td>${data.rupee}</td>
                    <td>${data.token}</td>
                    <td>${data.work}</td>
                `;
                userDataBody.appendChild(row); // Append each row to the table body
                totalUsersCount++; // Increment total users count
            });

            // Update total users count in the overview section
            totalUsersOverview.textContent = totalUsersCount;
        } else {
            console.log("No user data found");
        }
    } catch (error) {
        console.error("Error fetching user data: ", error);
    }
}

// Function to fetch withdrawal data from Firebase Realtime Database
async function fetchWithdrawalData() {
    const withdrawalDataBody = document.getElementById('withdrawal-data-body');
    const totalPaymentElement = document.getElementById('total-payment');
    const totalWithdrawalsOverview = document.getElementById('total-payments-overview'); // New element for total withdrawals
    withdrawalDataBody.innerHTML = ''; // Clear existing data
    let totalPayment = 0; // Initialize total payment counter
    let totalWithdrawalsCount = 0; // Initialize total withdrawals counter

    // Reference to the withdrawal data in Firebase Realtime Database
    const dbRef = ref(database);
    
    try {
        const snapshot = await get(child(dbRef, 'withdraw_list')); // Fetch data from the 'withdraw_list' path
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val(); // Get data from each child node
                
                // Accumulate the total amount
                totalPayment += data.amount;
                totalWithdrawalsCount++; // Increment total withdrawals count

                // Create a new table row for each withdrawal
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${data.name}</td>
                    <td>${data.amount}</td>
                    <td>${data.date_time}</td>
                    <td>${data.phone_number}</td>
                    <td>${data.upi}</td>
                `;
                withdrawalDataBody.appendChild(row); // Append each row to the table body
            });
            totalPaymentElement.textContent = totalPayment; // Update the total payment display
            totalWithdrawalsOverview.textContent = totalWithdrawalsCount; // Update the total withdrawals count display
        } else {
            console.log("No withdrawal data found");
            totalPaymentElement.textContent = 0; // If no data found, set total to 0
            totalWithdrawalsOverview.textContent = 0; // Set total withdrawals to 0
        }
    } catch (error) {
        console.error("Error fetching withdrawal data: ", error);
        totalPaymentElement.textContent = 0; // If an error occurs, set total to 0
        totalWithdrawalsOverview.textContent = 0; // Set total withdrawals to 0
    }
}

// Search user data by number
function searchUser() {
    const searchInput = document.getElementById('search-number').value.trim();
    fetchUserData(searchInput); // Pass the search query to the fetchUserData function
}

// Add event listener to the search button
document.getElementById('search-button').addEventListener('click', searchUser);

// Call the function to fetch all user data on page load
window.onload = function () {
    fetchUserData(); // Load all user data initially
    fetchWithdrawalData(); // Load withdrawal data
};
