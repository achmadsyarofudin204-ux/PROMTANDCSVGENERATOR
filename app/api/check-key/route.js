export async function POST(request) {
  try {
    const { apiKey } = await request.json();

    if (!apiKey) {
      return Response.json(
        { error: 'API Key diperlukan' },
        { status: 400 }
      );
    }

    // Check the API key by making a simple request to Google Gemini API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: 'test'
          }]
        }]
      }),
      // Add API key to query
      redirect: 'follow'
    });

    const url = new URL('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent');
    url.searchParams.append('key', apiKey);

    const checkResponse = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: 'test'
          }]
        }]
      })
    });

    const data = await checkResponse.json();

    if (checkResponse.ok) {
      return Response.json({ status: 'active' });
    } else if (data.error?.message?.includes('quota') || data.error?.message?.includes('RESOURCE_EXHAUSTED')) {
      return Response.json(
        { error: 'Quota limit reached', status: 'limit' },
        { status: 429 }
      );
    } else {
      return Response.json(
        { error: data.error?.message || 'Invalid API Key' },
        { status: 401 }
      );
    }
  } catch (error) {
    return Response.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
