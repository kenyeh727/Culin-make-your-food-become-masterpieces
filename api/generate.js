const { GoogleGenerativeAI } = require('@google/generative-ai');

module.exports = async (req, res) => {
    // CORS configuration
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { topic } = req.body;

    if (!topic) {
        return res.status(400).json({ error: 'Topic is required' });
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `You are a professional Michelin-star chef. 
    Please generate a detailed, creative, and delicious recipe for "${topic}" in HTML format.
    The response should be wrapped in a <div> and include:
    1. <h1> Recipe Name </h1>
    2. <h3> Ingredients </h3> (as a <ul> with <li>)
    3. <h3> Steps </h3> (as an <ol> with <li>)
    4. <h3> Nutritional Information Table </h3> (including calories, protein, fat, carbohydrates)
    
    Make the style appetizing and professional. Use Traditional Chinese for the content.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ recipe: text });
    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ error: 'Failed to generate recipe. Please check your API key and try again.' });
    }
};
