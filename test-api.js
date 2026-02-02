async function testApi() {
    try {
        const res = await fetch('http://localhost:3000/api/articles');
        const data = await res.json();
        console.log('Articles from API:', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('API Test Error:', e.message);
    }
}
testApi();
