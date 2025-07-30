

export const verify = async () => {
    try {
        const res = await fetch("http://localhost:1111/verify", {
            credentials: 'include'
        });

        if (!res.ok) {
            throw new Error('Unauthorized or verification failed');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('JWT verification failed:', error.message);
        return { success: false, message: error.message };
    }
}
