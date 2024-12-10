const axios = require('axios');

// Define the API endpoint and body
const url2 = 'https://epassportservicesaddt-staging.azurewebsites.net/Schedule/api/V1.0/Schedule/SubmitAppointment'; // Replace with your API endpoint

const body2 = {
    date: "2024-12-08",
    // date: "2025-04-17",
    dateTimeFormat: "yyyy-MM-dd",
    durationId: 781,
    id: 0,
    noOfApplicants: 1,
    isUrgent: true,
    processDays: 2,
    officeId: 24,
    requestTypeId: 2
};


// Define headers (if required)
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQW5vbnltb3VzQGV0aGlvcGlhbmFpcmxpbmVzLmNvbSIsIm5iZiI6MTczMzM4Mzc5MCwiZXhwIjoxNzQzNzUxNzkwLCJpYXQiOjE3MzMzODM3OTB9.EvJAnCLWu1JoCl4mr0yrWm0x6Rhc7yseRmGa3exHKwg', // Replace YOUR_TOKEN with a valid token
};

// Function to make POST request
async function makePostRequest2() {
    try {
        const response = await axios.post(url2, body2, { headers });
        console.log('Response Data:', response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

// Execute the function
makePostRequest2();
