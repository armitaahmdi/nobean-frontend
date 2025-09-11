// Helper script to set authentication token in localStorage for testing
// Run this in browser console to set the token

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU3NDQ4ODAyLCJleHAiOjE3NTgwNTM2MDJ9.tL66KzsOtNiX50nsMoROwLtWHlrKBWO59kHGD1dmsVE";

const userData = {
  "id": 1,
  "firstName": "علی",
  "lastName": "محمدی",
  "userName": "ali123",
  "role": "student",
  "email": "ali@example.com",
  "age": 30,
  "birthDate": null,
  "phone": "09198718211",
  "isActive": true,
  "isParent": false,
  "childPhone": null,
  "isFather": null,
  "motherId": null,
  "fatherId": null,
  "createdAt": "2025-09-09T12:17:42.000Z",
  "updatedAt": "2025-09-09T20:46:34.000Z"
};

// Set token and user data in localStorage
localStorage.setItem('authToken', token);
localStorage.setItem('userData', JSON.stringify(userData));

console.log('Token and user data set in localStorage');
console.log('Token:', localStorage.getItem('authToken'));
console.log('User Data:', JSON.parse(localStorage.getItem('userData')));

// Reload the page to trigger authentication
window.location.reload();
