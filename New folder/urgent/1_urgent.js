const axios = require('axios');

// Define the API endpoint and body
const url = 'https://epassportservicesaddt-staging.azurewebsites.net/Schedule/api/V1.0/Schedule/GetUrgentAvailableDateAndTimes'; // Replace with your API endpoint

const minOfficeId=24;
const body = {
      // "startDate":"2025-03-15T21:00:00.000Z",
    // "endDate":"2025-04-18T21:00:00.000Z",
    // "requestTypeId":2,
    // "officeId":minOfficeId,
    //  "noOfApplicants":1

    // "processDays":1,
    // "isUrgent":true,
    
    
   "requestTypeId":2,
    "officeId":minOfficeId,
    "noOfApplicants":1
};

// Define headers (if required)
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQW5vbnltb3VzQGV0aGlvcGlhbmFpcmxpbmVzLmNvbSIsIm5iZiI6MTczMzM4Mzc5MCwiZXhwIjoxNzQzNzUxNzkwLCJpYXQiOjE3MzMzODM3OTB9.EvJAnCLWu1JoCl4mr0yrWm0x6Rhc7yseRmGa3exHKwg', // Replace YOUR_TOKEN with a valid token
};

let successCount = 0; // Initialize a counter for successful responses

// Function to make POST request
async function makePostRequest() {
    setInterval(async () => {
        try {
            const response = await axios.post(url, body, { headers });
            successCount++; // Increment the success count
            console.log('Response Data:', JSON.stringify(response.data, null, 2));
            console.log(`Success Response Count: ${successCount}`); // Log the success count

        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format: YYYY-MM-DD HH:mm:ss
            console.error(`Error at ${currentTime}: ${errorMessage} | Success Response Count: ${successCount}`); // Log error with formatted time and success count
        }
    }, 1000); // Execute every second
}

// Execute the function
makePostRequest();
