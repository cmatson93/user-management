// const host = 'https://glacial-spire-11606.herokuapp.com';
const host ='http://localhost:3001'
const api = {
    get: async () => {
        const response = await fetch(`${host}/users`)
        if (response.ok) {
            return response.json();
        } else {
            return 'error'
        }
    },
    post: async (user) => {
        const response = await fetch(`${host}/user`, {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (response.ok) {
            const resBody = response.json();
            return resBody;
        } else {
            return 'error'
        }
    },
    delete: async (id) => {
        const response = await fetch(`${host}/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        });
        if (response.ok) {
            const resBody = response.json();
            return resBody;
        } else {
            return 'error';
        }
    },
    put: async (user) => {
        const response = await fetch(`${host}/user/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (response.ok) {
            const resBody = response.json();
            return resBody;
        } else {
            return 'error'
        }
    }
}

export default api;