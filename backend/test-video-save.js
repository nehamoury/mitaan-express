const fetch = require('node-fetch');

async function testVideoSave() {
    const API_URL = 'http://localhost:3000/api/media';
    const videoData = {
        title: 'Test Video',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Classic test URL
        type: 'VIDEO',
        category: 'GALLERY',
        description: 'Test description',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg'
    };

    console.log('📡 Sending Test Video Data...');

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // Note: Auth might be required depending on actual middleware config
            },
            body: JSON.stringify(videoData)
        });

        const result = await response.json();
        console.log('📥 Response Status:', response.status);
        console.log('📥 Response Body:', JSON.stringify(result, null, 2));

        if (response.ok) {
            console.log('✅ Video saved successfully in test!');
        } else {
            console.log('❌ Failed to save video.');
        }
    } catch (error) {
        console.error('🔥 Error during fetch:', error.message);
    }
}

testVideoSave();
