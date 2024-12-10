const axios = require('axios');

// Define the API endpoint and body
const url = 'https://epassportservicesaddt-staging.azurewebsites.net/Schedule/api/V1.0/Schedule/GetUrgentAvailableDateAndTimes'; // Replace with your API endpoint
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

// Define headers (if required)
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQW5vbnltb3VzQGV0aGlvcGlhbmFpcmxpbmVzLmNvbSIsIm5iZiI6MTczMzU0NzQ0MSwiZXhwIjoxNzQzOTE1NDQxLCJpYXQiOjE3MzM1NDc0NDF9.B-XfCA1B4OV8g1VrCx--IfnKmAN_656lUhq1xxrEXVg', // Replace YOUR_TOKEN with a valid token
};

// Function to make POST request
async function makePostRequest() {
    const now = new Date();
    const requests = [];

    // Loop through the next 10 days
    for (let day = 0; day < 10; day++) {
        const date = new Date(now);
        date.setDate(now.getDate() + day);

        // Loop through each hour of the day
        for (let hour = 0; hour < 24; hour++) {
            // Loop through the specified minutes (every 15 minutes)
            for (let minute of [0, 15, 30, 45]) {
                const apptDate = new Date(date);
                apptDate.setHours(hour, minute, 0, 0); // Set hour, minute, second, and millisecond to 0

                // Create a request for each appointment date
                const requestBody = {
                    apptDate: apptDate.toISOString(),
                    isUrgent: true,
                    noOfApplicants: 1,
                    officeId: 24,
                    processDays: 1,
                    requestTypeId: 2
                };

                // Push the request to the array
                requests.push(axios.post(url, requestBody, { headers }));
                
                // Log the appointment date in the desired format
                console.log('Requesting for:', apptDate.toISOString());
            }
        }
        console.log('Done for', date);
    }

    // Execute all requests concurrently
    try {
        const responses = await Promise.all(requests);
        responses.forEach(response => {
            // Define the error object to compare against
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
                console.log('Received an error response for:', response.config.data);
            }
        });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}
// Execute the function
makePostRequest();
