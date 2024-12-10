const axios = require('axios');

// Define the API endpoint and body
// const url = 'https://epassportservicesaddt-staging.azurewebsites.net/Schedule/api/V1.0/Schedule/GetUrgentAvailableDateAndTimes'; // Replace with your API endpoint
const body = 
// {
// 	apptDate: "2024-12-07T21:00:00.000Z",
// 	isUrgent: true,
// 	noOfApplicants: 1,
// 	officeId: 24,
// 	processDays: 2,
// 	requestTypeId: 2
// };
{
	apptDate: "2024-12-09T02:00:00.000Z",
	isUrgent: true,
	noOfApplicants: 1,
	officeId: 24,
	processDays: 1,
	requestTypeId: 2
};
// {
// 	"apptDate": "2025-03-15T21:00:00.000Z",
// 	"isUrgent": true,
// 	"noOfApplicants": 1,
// 	"officeId": 24,
// 	"processDays": 1,
// 	"requestTypeId": 2
// };



// Function to make POST request
async function makePostRequest() {
    const url = 'https://epassportservicesaddt-staging.azurewebsites.net/Schedule/api/V1.0/Schedule/GetUrgentAvailableDateAndTimes'; // Replace with your API endpoint
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQW5vbnltb3VzQGV0aGlvcGlhbmFpcmxpbmVzLmNvbSIsIm5iZiI6MTczMzU0NzQ0MSwiZXhwIjoxNzQzOTE1NDQxLCJpYXQiOjE3MzM1NDc0NDF9.B-XfCA1B4OV8g1VrCx--IfnKmAN_656lUhq1xxrEXVg', // Replace YOUR_TOKEN with a valid token
    };

    while (true) { // Infinite loop until manually stopped
        const now = new Date();
        const apptDate = new Date(now);
        apptDate.setSeconds(0, 0); // Set seconds and milliseconds to 0

        // Create a request for the current appointment date
        const requestBody = {
            apptDate: apptDate.toISOString(),
            isUrgent: true,
            noOfApplicants: 1,
            officeId: 24,
            processDays: 1,
            requestTypeId: 2
        };

        // Log the current timestamp being tested
        console.log('Testing for:', apptDate.toISOString());

        try {
            const response = await axios.post(url, requestBody, { headers });
            const errorObject = {
                id: 0,
                date: null,
                dateAppt: '0001-01-01T00:00:00',
                format: null,
                duration: null,
                message: 'Urgent Request Not Allowed',
                businessErrorCode: null,
                status: 0,
                messageList: null,
                errors: null
            };

            // Check if the response data is not equal to the error object
            if (JSON.stringify(response.data) !== JSON.stringify(errorObject)) {
                console.log('Response Data:', response.data);
            } else {
                console.log('Received an error response for:', requestBody);
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }

        // Wait for a specified interval before the next request (e.g., 1 minute)
        await new Promise(resolve => setTimeout(resolve, 60000)); // Adjust the interval as needed
    }
}

// Execute the function
makePostRequest();
