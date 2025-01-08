export const getUserCountry = async (): Promise<string> => {
    try {
        const response = await fetch('http://ip-api.com/json');
        const data = await response.json();
        return data.countryCode;
    } catch (error) {
        console.error('Error fetching country from IP:', error);
        return 'UA';
    }
};
