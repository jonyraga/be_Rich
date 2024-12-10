const axios = require('axios');

async function fetchData() {
    try {
        const response = await axios.get('https://epassportservicesaddt-staging.azurewebsites.net/Master/api/V1.0/AdvancedRestriction/GetAll', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQW5vbnltb3VzQGV0aGlvcGlhbmFpcmxpbmVzLmNvbSIsIm5iZiI6MTczMzM4Mzc5MCwiZXhwIjoxNzQzNzUxNzkwLCJpYXQiOjE3MzMzODM3OTB9.EvJAnCLWu1JoCl4mr0yrWm0x6Rhc7yseRmGa3exHKwg',
            },
        });
        console.log(response.data); // Process the response
        // console.log('Response Data:', JSON.stringify(response.data, null, 2));

    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

fetchData();
