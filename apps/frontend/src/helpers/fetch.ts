export const fetcher = async (url: string, method: string, body: unknown, authKey?: string) => {
    console.log("Fetching: ", localStorage.getItem('taskify-auth-token'));
    const response = await fetch(url, {
        method: method,
        body: body == '' ? undefined : JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('taskify-auth-token')}`,
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': ''
        }
    });
    // console.log("Response: ", await response.text());
    console.log("Response: ", response);
    return response.json();
}