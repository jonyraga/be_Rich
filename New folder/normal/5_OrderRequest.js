const axios = require('axios');

// Define the API endpoint and body
const url5 = 'https://epassportservicesaddt-staging.azurewebsites.net/Payment/api/V1.0/Payment/OrderRequest'; // Replace with your API endpoint

// Define headers (if required)
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQW5vbnltb3VzQGV0aGlvcGlhbmFpcmxpbmVzLmNvbSIsIm5iZiI6MTczMzM4Mzc5MCwiZXhwIjoxNzQzNzUxNzkwLCJpYXQiOjE3MzMzODM3OTB9.EvJAnCLWu1JoCl4mr0yrWm0x6Rhc7yseRmGa3exHKwg', // Replace YOUR_TOKEN with a valid token
};

// Function to make POST request
async function makePostRequest5() {
    const body5 ={"FirstName":"KLJKL","LastName":"KJLK","Email":"","Phone":"+251912345678","Amount":5000,"Currency":"ETB","City":"Addis Ababa","Country":"ET","Channel":"Mobile","PaymentOptionsId":13,"requestId":6154871};
    try {
        const response = await axios.post(url5, body5, { headers });
        console.log('Response Data:', response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

// Execute the function
makePostRequest5();
