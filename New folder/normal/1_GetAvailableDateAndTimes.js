const axios = require('axios');

// Define the API endpoint and body
const url = 'https://epassportservicesaddt-staging.azurewebsites.net/Schedule/api/V1.0/Schedule/GetAvailableDateAndTimes'; // Replace with your API endpoint
// const body = {
//     apptDate: "2024-12-06T02:00:00.000Z",
//     // processDays: 1,
//     isUrgent: true,
//     requestTypeId: 2,
//     officeId: 24,
//     noOfApplicants: 1,
// };

const body = {
    "startDate":"2025-03-16T21:00:00.000Z",//format: yyyy-MM-dd and time with format: yyyy-MM-ddTHH:mm:ss.SSSZ and SSS means milliseconds and T means time   21 means 21:00:00.000Z  in GMT when it convert to local time it will be 21:00:00.000 in local time with AM/PM
    "endDate":"2025-04-19T21:00:00.000Z",//format: yyyy-MM-dd and time with format: yyyy-MM-ddTHH:mm:ss.SSSZ and SSS means milliseconds and 21 means 21:00:00.000Z  in GMT when it convert to local time it will be 21:00:00.000 in local time with AM/PM   this is equal to 3:00 PM in local time? 
    "requestTypeId":2,
    "officeId":26,
    "noOfApplicants":1,

};

// Define headers (if required)
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQW5vbnltb3VzQGV0aGlvcGlhbmFpcmxpbmVzLmNvbSIsIm5iZiI6MTczMzM4Mzc5MCwiZXhwIjoxNzQzNzUxNzkwLCJpYXQiOjE3MzMzODM3OTB9.EvJAnCLWu1JoCl4mr0yrWm0x6Rhc7yseRmGa3exHKwg', // Replace YOUR_TOKEN with a valid token
};

// Function to make POST request
async function makePostRequest() {
    try {
        const response = await axios.post(url, body, { headers });
        console.log('Response Data:', JSON.stringify(response.data, null, 2));

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

// Execute the function
makePostRequest();
