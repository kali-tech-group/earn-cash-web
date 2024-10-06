// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

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
const db = getFirestore(app);

// Function to fetch payment proof data
async function fetchPaymentProofData() {
    try {
        const paymentProofRef = collection(db, 'paymentProofs'); // Reference to your Firestore collection
        const snapshot = await getDocs(paymentProofRef);

        const paymentProofsContainer = document.getElementById('paymentProofsContainer');
        paymentProofsContainer.innerHTML = ''; // Clear existing content

        if (!snapshot.empty) {
            snapshot.forEach(doc => {
                const payment = doc.data();

                const paymentProofDiv = document.createElement('div');
                paymentProofDiv.classList.add('payment-proof');
                paymentProofDiv.innerHTML = `
                    <div class="payment-info">
                        <h4>Name: ${payment.name}</h4>
                        <p>Phone Number: ${payment.number.replace(/.(?=.{5})/g, 'x')}</p>
                        <p>Amount: ₹${payment.amount}</p>
                        <p>Date: ${payment.date}</p>
                        <p>Time: ${payment.time}</p>
                        <p>UPI ID: ${payment.upi}</p>
                    </div>
                    <img src="${payment.fileUrl}" class="payment-image" alt="Payment Proof" />
                   
                `;
                paymentProofsContainer.appendChild(paymentProofDiv);
            });
        } else {
            paymentProofsContainer.innerHTML = '<p>No payment proofs available.</p>';
        }
    } catch (error) {
        console.error("Error fetching payment proofs: ", error);
    }
}

// Function to open the payment proof image in a new tab
function viewProof(imageUrl) {
    window.open(imageUrl, '_blank'); // Open the image URL in a new tab
}

// Fetch payment proof data when the document is ready
document.addEventListener('DOMContentLoaded', fetchPaymentProofData);
