export const load = async ({ params }) => {
    const { entityId } = params

    const url = `http://localhost:3000/api/entities/${entityId.toString()}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = response.json()
    return result;
};
