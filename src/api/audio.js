// Audio API service

const API_BASE_URL = '/api'; // Adjust this to match your backend URL

export const audioApi = {
    // Get list of audio tracks
    async getAudioList() {
        try {
            const response = await fetch(`${API_BASE_URL}/audio`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch audio list');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching audio list:', error);
            throw error;
        }
    },

    // Get single audio track by ID
    async getAudioById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/audio/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch audio');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching audio:', error);
            throw error;
        }
    }
};

export default audioApi;