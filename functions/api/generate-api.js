export async function onRequest(context) {
  const { request } = context;

  try {
    const body = await request.json();

    const response = await fetch("https://ragchat-carreras.onrender.com/generate-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const responseBody = await response.text();
    const headers = new Headers(response.headers);
    headers.set("Content-Type", "application/json");

    return new Response(responseBody, {
      status: response.status,
      headers,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error proxying request to ragchat backend." }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
