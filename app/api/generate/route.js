export async function POST(request) {
  try {
    const { prompt, apiKey, model, mediaType, format } = await request.json();

    if (!prompt || !apiKey || !model) {
      return Response.json(
        { error: 'Missing required fields: prompt, apiKey, atau model' },
        { status: 400 }
      );
    }

    // Build the API endpoint
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    // Prepare the request body
    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.9,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    };

    // Make the request to Google Gemini API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (!response.ok) {
      // Check if it's a quota/rate limit error
      if (data.error?.message?.includes('quota') || data.error?.message?.includes('RESOURCE_EXHAUSTED')) {
        return Response.json(
          { error: 'API quota limit reached. Try another API key.' },
          { status: 429 }
        );
      }
      
      return Response.json(
        { error: data.error?.message || 'Failed to generate content' },
        { status: response.status }
      );
    }

    // Extract the generated content
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      return Response.json(
        { error: 'No content generated' },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      content: generatedText,
      model: model,
      mediaType: mediaType,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Generate API Error:', error);
    
    return Response.json(
      { error: error.message || 'Server error occurred' },
      { status: 500 }
    );
  }
}
