import axios from 'axios';
import baseURL from '../baseURL';

// Define fetchData function
const fetchData = async (method, endpoint, data) => {
    try {
        const response = await fetch(`http://localhost:3001${endpoint}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
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
            localStorage.setItem('userId', response.userId);
            navigate('/new-match');
        }
    } catch (error) {
        console.error('Sign in error:', error);
    }
};

// Define handleSignUp function
const handleSignUp = async (name, email, password, navigate) => {
    try {
        const response = await fetchData('POST', '/auth/signup', { name, email, password });

        if (response.message) {
            alert(response.message);
        }

        // Optionally, automatically sign in after sign up
        await handleSignIn(email, password, navigate);
    } catch (error) {
        console.error('Sign up error:', error);
    }
};

// Function to add a new match
const addNewMatch = async (matchData) => {
    console.log(matchData)
    try {
        // Make a POST request to the server
        // const response = await axios.post('http://localhost:3001/matches/add', matchData);
        const response = await fetchData('POST', '/matches/add', { ...matchData });


        // Log the response for debugging purposes
        console.log(response);

        // Return the response data
        return response.data;
    } catch (error) {
        // If an error occurs, log the error and rethrow it
        console.error('Error adding new match:', error);
        // throw error;
    }
};




// Export handleSignIn and handleSignUp functions
export { handleSignIn, handleSignUp, addNewMatch };