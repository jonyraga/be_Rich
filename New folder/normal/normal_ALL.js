const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');


// Define the API endpoint and body
const url1 = 'https://epassportservicesaddt-staging.azurewebsites.net/Schedule/api/V1.0/Schedule/GetAvailableDateAndTimes'; // Replace with your API endpoint
const url2 = 'https://epassportservicesaddt-staging.azurewebsites.net/Schedule/api/V1.0/Schedule/SubmitAppointment'; // Replace with your API endpoint
const url3 = 'https://epassportservicesaddt-staging.azurewebsites.net/Request/api/V1.0/Request/SubmitRequest'; // Replace with your API endpoint
const url4 = 'https://epassportservicesaddt.azurewebsites.net/Request/api/V1.0/RequestAttachments/UploadAttachment'; // Replace with your endpoint
const url5 = 'https://epassportservicesaddt-staging.azurewebsites.net/Payment/api/V1.0/Payment/OrderRequest'; // Replace with your API endpoint

// Use environment variables for sensitive information
const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQW5vbnltb3VzQGV0aGlvcGlhbmFpcmxpbmVzLmNvbSIsIm5iZiI6MTczMzM4Mzc5MCwiZXhwIjoxNzQzNzUxNzkwLCJpYXQiOjE3MzMzODM3OTB9.EvJAnCLWu1JoCl4mr0yrWm0x6Rhc7yseRmGa3exHKwg'; // Set this in your environment
let headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`, // Use the environment variable
};

let minId; // Declare minId in a higher scope
let minOfficeId=24; // Declare minOfficeId in a higher scope

// Define an array of users with their information
const users = [
    {
        firstName: "SIRMOLO",
        middleName: "SEMAN",
        lastName: "SANI",
        geezFirstName: "ስርሞሎ",
        geezMiddleName: "ሰማን",
        geezLastName: "ሳኒ",
        dateOfBirth: "1999-11-29",
        phoneNumber: "0922357197",
        gender:1,
        birthPlace:"WERADIJO",
    },
    {
        firstName: "SIRMOLO",
        middleName: "SEMAN",
        lastName: "SANI",
        geezFirstName: "ስርሞሎ",
        geezMiddleName: "ሰማን",
        geezLastName: "ሳኒ",
        dateOfBirth: "1999-11-29",
        phoneNumber: "0954470602",
        gender:0,//0 for female and 1 for male
        birthPlace:"WERADIJO",
    },
];

// Function to process each user
async function processUsers() {
    console.log("--------------------------------");
    for (const user of users) {
        try {
            await makePostRequest1(user); // Pass user data to the function
        } catch (error) {
            console.error(`Error processing user ${user.firstName} ${user.lastName}:`, error.message);
        }
        console.log("--------------------------------");
    }
}

// Function to make POST request
async function makePostRequest1(user) {
    const body1 = {
        "startDate": "2025-03-15T21:00:00.000Z",
        "endDate": "2025-04-18T21:00:00.000Z",
        "requestTypeId": 2,
        "officeId": minOfficeId,
        "noOfApplicants": 1
    };
    try {
        const response = await axios.post(url1, body1, { headers });
        // console.log('Response Data:', JSON.stringify(response.data, null, 2));
        const availableDateAndTimes = response.data.availableDateAndTimes;

        // Find the minimum date
        const minDateEntry = availableDateAndTimes.reduce((min, current) => {
            return new Date(current.date) < new Date(min.date) ? current : min;
        });

        // Extract the id and officeId from the minimum date entry
        const minDuration = minDateEntry.durations[0]; // Assuming you want the first duration
        minId = minDuration.id; // Assign to the higher scope variable
        let pickedDate = minDateEntry.date.split('T')[0]; // Extract only the date part (YYYY-MM-DD)
        // minOfficeId = minDuration.officeId; // Assign to the higher scope variable

        // Log the extracted values
        console.log('Minimum Date ID:', minId);
        console.log('Minimum Date Office ID:', minOfficeId);
        console.log('Picked Date:', pickedDate);
        //if it return Response Data: { availableDateAndTimes: [] } then it means there is no available date and time for the given startDate and endDate
        if (availableDateAndTimes.length === 0) {
            console.log('No available date and time for the given startDate and endDate');
        } else {
            await makePostRequest2(minId, minOfficeId, pickedDate, user); // Pass user data
        }
    } catch (error) {
        console.error('Error in makePostRequest1:', error.response ? error.response.data : error.message);
        // throw error; // Rethrow to handle in processUsers
    }
}

// Execute the function to process users
processUsers();

// Function to make POST request
async function makePostRequest2(minId, minOfficeId, pickedDate, user) {
    const body2 = {
        date: pickedDate,
        dateTimeFormat: "yyyy-MM-dd",
        durationId: minId,
        id: 0,
        noOfApplicants: 1,
        officeId: minOfficeId,
        requestTypeId: 2
    };
    try {
        const response = await axios.post(url2, body2, { headers });
        // console.log('Response Data:', response.data);
        const appointmentId = response.data.appointmentResponses[0].id; // Extract the id from the response
        console.log('Appointment ID:', appointmentId); // Log the extracted appointment ID
        await makePostRequest3(appointmentId, minOfficeId, user); // Pass user data
    } catch (error) {
        console.error('Error in makePostRequest2:', error.response ? error.response.data : error.message);
        // throw error; // Rethrow to handle in processUsers
    }
}



// Function to make POST request
async function makePostRequest3(appointmentId, minOfficeId, user) {
    const body3 = {
        requestId: 0,
        requestMode: 0,
        officeId: minOfficeId,
        deliverySiteId: 1,
        requestTypeId: 2,
        appointmentIds: [appointmentId],
        userName: "Anonymous@ethiopianairlines.com", // Use user email if available
        deliveryDate: "",
        status: 0,
        confirmationNumber: "",
        applicants: [{
            personId: 0,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            geezFirstName: user.geezFirstName,
            geezMiddleName: user.geezMiddleName,
            geezLastName: user.geezLastName,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
            nationalityId: 1,
            height: "",
            eyeColor: "",
            hairColor: "Black",
            occupationId: null,
            birthPlace: user.birthPlace,
            birthCertificateId: "",
            photoPath: "",
            employeeID: "",
            applicationNumber: "",
            organizationID: "",
            isUnder18: false,
            isAdoption: false,
            passportNumber: "",
            isDatacorrected: false,
            passportPageId: 1,
            correctionType: 0,
            maritalStatus: 0,
            phoneNumber: user.phoneNumber,
            email: "",
            requestReason: 0,
            address: {
                personId: 0,
                addressId: 0,
                city: "Addis Ababa",
                region: "Addis Ababa",
                state: "",
                zone: "",
                wereda: "",
                kebele: "",
                street: "",
                houseNo: "",
                poBox: "",
                requestPlace: ""
            },
            familyRequests: []
        }]
    };
    try {
        const response = await axios.post(url3, body3, { headers });
        // console.log('Response Data:', JSON.stringify(response.data, null, 2));
        const requestPersonId = response.data.serviceResponseList[0].requestPersonId; // Extract requestPersonId
        const applicationNumber = response.data.serviceResponseList[0].personResponses.applicationNumber; // Extract applicationNumber
        const requestId = response.data.serviceResponseList[0].requestId; // Extract requestId  
        console.log('Application Number:', applicationNumber);
        console.log('Request Person ID:', requestPersonId);
        await makePostRequest5(requestId,user);
        await uploadAttachments4(requestPersonId); // Pass the extracted requestPersonId


    } catch (error) {
        console.error('Error in makePostRequest3:', error.response ? error.response.data : error.message);
        // throw error; // Rethrow to handle in processUsers
    }
}

// Function to make POST request
async function uploadAttachments4(requestPersonId) {
    // Create a FormData instance
const formData = new FormData();

// Append data to FormData
formData.append('personRequestId', requestPersonId); // requestPersonId
formData.append(10, fs.createReadStream('new.jpg')); // Authenticated Birth Certificate
formData.append(11, fs.createReadStream('new2.jpg')); // Valid Residents Applicant ID/Government Employees Organization ID

// Headers, including those for FormData
let headers = {
    ...formData.getHeaders(),
    'Authorization': `Bearer ${API_TOKEN}`, // Use the environment variable
};

    try {
        const response = await axios.post(url4, formData, { headers });
        // console.log('Response Data:', response.data);
        if(response.data.status==1){
            console.log("Attachment Uploaded Successfully");
        }else{
            console.log("Attachment Upload Failed");
        }
    } catch (error) {
        console.error('Error in uploadAttachments4:', error.response ? error.response.data : error.message);
        // throw error; // Rethrow to handle in processUsers
    }
}

async function makePostRequest5(requestId,user) {
    const body5 = {
        "FirstName": user.firstName,
        "LastName": user.lastName,
        "Email": "",
        "Phone": user.phoneNumber,
        "Amount": 5000,
        "Currency": "ETB",
        "City": "Addis Ababa",
        "Country": "ET", 
        "Channel": "Mobile",
        "PaymentOptionsId": 13,
        "requestId": requestId
    };
    try {
        const response = await axios.post(url5, body5, { headers });
        // Log the entire payment response
        // console.log('Payment Response:', response.data);
        // Extract and log the orderId
        const orderId = response.data.orderId; // Extract the orderId
        console.log('Order ID:', orderId); // Log the extracted order ID
    } catch (error) {
        console.error('Error in makePostRequest5:', error.response ? error.response.data : error.message);
        // throw error; // Rethrow to handle in processUsers
    }
}
