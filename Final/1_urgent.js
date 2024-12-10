const axios = require('axios');

// Define the API endpoint and body
const url = 'https://epassportservicesaddt-staging.azurewebsites.net/Schedule/api/V1.0/Schedule/GetUrgentAvailableDateAndTimes'; // Replace with your API endpoint

const body = 
{
    "apptDate": "2025-03-18T21:00:00.000Z",
    "processDays": 2,
    "isUrgent": true,
    "requestTypeId": 2,
    "officeId": 24,
    "noOfApplicants": 1
};

// Define headers (if required)
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQW5vbnltb3VzQGV0aGlvcGlhbmFpcmxpbmVzLmNvbSIsIm5iZiI6MTczMzM4Mzc5MCwiZXhwIjoxNzQzNzUxNzkwLCJpYXQiOjE3MzMzODM3OTB9.EvJAnCLWu1JoCl4mr0yrWm0x6Rhc7yseRmGa3exHKwg', // Replace YOUR_TOKEN with a valid token
};

let successCount = 0; // Initialize a counter for successful responses

// Function to make POST request
async function makePostRequest() {
    let errorMessage = '';
    let response = '';    
    setInterval(async () => {
        const currentTime = new Date().toLocaleString('en-US', { timeZone: 'Africa/Addis_Ababa' }); // Format: YYYY-MM-DD HH:mm:ss
        try {
            response = await axios.post(url, body, { headers });
            successCount++; // Increment the success count
            console.log('Response Data:', JSON.stringify(response.data, null, 2));
    
        } catch (error) {
             errorMessage = error.response ? error.response.data.message : error.message;
             console.error(`Error at ${currentTime}: ${errorMessage} | Success Count: ${successCount}`); // Log error with formatted time and success count
        }
    }, 1000); // Execute every second
}

// Execute the function
makePostRequest();

