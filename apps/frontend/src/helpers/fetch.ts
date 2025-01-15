export const fetcher = async (url: string, method: string, body: unknown, authKey?: string) => {
    console.log("Fetching: ", url);
    const response = await fetch(url, {
        method: method,
        body: body == '' ? undefined : JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authKey ? `Bearer ${authKey}` : '',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': ''
        }
    });
    // console.log("Response: ", await response.text());
    console.log("Response: ", response);
    return response.json();
}