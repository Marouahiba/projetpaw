import { useState } from 'react';

const useAsyncFunction = (asyncFunction) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    console.log({ success })
    const execute = async (...args) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {

            const response = await asyncFunction(...args);
            console.log(response);
            setSuccess(true);
            return response; // Return the response if needed
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            throw err; // Re-throw the error to handle it outside if needed
        } finally {
            setLoading(false);
        }
    };

    return { execute, loading, error, success };
};

export default useAsyncFunction;
