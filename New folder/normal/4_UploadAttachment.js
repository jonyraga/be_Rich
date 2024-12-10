const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// Define the API endpoint
const url = 'https://epassportservicesaddt.azurewebsites.net/Request/api/V1.0/RequestAttachments/UploadAttachment'; // Replace with your endpoint

// Create a FormData instance
const formData = new FormData();

// Append data to FormData
formData.append('personRequestId', 5297831); // requestPersonId
formData.append(10, fs.createReadStream('new.jpg')); // Authenticated Birth Certificate
formData.append(11, fs.createReadStream('new2.jpg')); // Valid Residents Applicant ID/Government Employees Organization ID

// Headers, including those for FormData
const headers = {
    ...formData.getHeaders(),
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQW5vbnltb3VzQGV0aGlvcGlhbmFpcmxpbmVzLmNvbSIsIm5iZiI6MTczMzM4Mzc5MCwiZXhwIjoxNzQzNzUxNzkwLCJpYXQiOjE3MzMzODM3OTB9.EvJAnCLWu1JoCl4mr0yrWm0x6Rhc7yseRmGa3exHKwg', // Replace YOUR_TOKEN with a valid token
};

// Function to make POST request
async function uploadAttachments() {
    try {
        const response = await axios.post(url, formData, { headers });
        console.log('Response Data:', response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

// Execute the function
uploadAttachments();
