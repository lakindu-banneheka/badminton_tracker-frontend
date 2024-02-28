export const getIpAddress = async () => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        // setIpAddress(data.ip);
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
    }
};