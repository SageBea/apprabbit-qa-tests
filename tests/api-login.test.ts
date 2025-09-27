import axios from 'axios';

const BASE_URL = 'https://app.apprabbit.com'; // AppRabbit login API base
const LOGIN_ENDPOINT = '/login';               // Endpoint for login

// Test account credentials
const testUser = {
  email: 'sagephovid1@gmail.com',
  password: 'cibzev-9hicGy-gytxit'
};

async function runLoginTest() {
  try {
    const response = await axios.post(`${BASE_URL}${LOGIN_ENDPOINT}`, testUser);

    if (response.status === 200) {
      console.log('✅ API Login Test Passed');
      console.log('Response data:', response.data);
    } else {
      console.log('❌ API Login Test Failed with status:', response.status);
    }
  } catch (error: any) {
    console.error('❌ API Login Test Error:', error.message);
  }
}

// Run the test
runLoginTest();
