const axios = require('axios');

// Define the API endpoint and body
const url3 = 'https://epassportservicesaddt-staging.azurewebsites.net/Request/api/V1.0/Request/SubmitRequest'; // Replace with your API endpoint
const user = {
    firstName: "ZEKIYA",
    middleName: "SIRAJ",
    lastName: "JUHAR",
    geezFirstName: "ዘኪያ",
    geezMiddleName: "ስራጅ",
    geezLastName: "ጁሃር",
    dateOfBirth: "2000-09-20",
    phoneNumber: "0918987628",
    gender:0, //0 for female and 1 for male
    birthPlace:"DALOCHA",
};
const body3 = {
    requestId: 0,
    requestMode: 0,
    officeId: 24,
    deliverySiteId: 1,
    requestTypeId: 2,
    appointmentIds: [7554285],
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
        maritalStatus: 0,// 0 single,1 married , 2 divorced, 3,widowed 
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
}


// Define headers (if required)
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQW5vbnltb3VzQGV0aGlvcGlhbmFpcmxpbmVzLmNvbSIsIm5iZiI6MTczMzM4Mzc5MCwiZXhwIjoxNzQzNzUxNzkwLCJpYXQiOjE3MzMzODM3OTB9.EvJAnCLWu1JoCl4mr0yrWm0x6Rhc7yseRmGa3exHKwg', // Replace YOUR_TOKEN with a valid token
};

// Function to make POST request
async function makePostRequest3() {
    try {
        const response = await axios.post(url3, body3, { headers });
        // console.log('Response Data:', response.data);
        console.log('Response Data:', JSON.stringify(response.data, null, 2));

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

// Execute the function
makePostRequest3();
