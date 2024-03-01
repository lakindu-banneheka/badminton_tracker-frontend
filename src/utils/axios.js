import axios from 'axios';
import baseURL from '../baseURL';

// Define fetchData function
const fetchData = async (method, endpoint, data = null, headers = {}) => {
    const url = `${baseURL}${endpoint}`;

    try {
        const response = await axios({
            method,
            url,
            data, // No need to stringify data, axios handles it
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Export fetchData function
export default fetchData;


// Define handleSignIn function
const handleSignIn = async (email, password, navigate) => {
    try {
        const response = await fetchData('POST', '/auth/signin', { email, password });
        if (response.userId) {
            localStorage.setItem('token', response.userId); // Save userID or token if needed
            navigate('/new-match');
        }
    } catch (error) {
        console.error('Sign in error:', error);
    }
};

// Define handleSignUp function
const handleSignUp = async (name, email, password) => {
    try {
        const response = await fetchData('POST', '/auth/signup', { name, email, password });

        if (response.message) {
            alert(response.message);
        }

        // Optionally, automatically sign in after sign up
        // await handleSignIn(email, password, navigate);
    } catch (error) {
        console.error('Sign up error:', error);
    }
};


// Export handleSignIn and handleSignUp functions
export { handleSignIn, handleSignUp };