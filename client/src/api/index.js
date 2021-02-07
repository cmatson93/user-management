const api = {
    get: async () => {
        console.log('Getting users...');
        const response = await fetch('http://localhost:3001/users')
        if (response.ok) {
            return response.json();
        } else {
            return 'error'
        }
    },
    post: async (user) => {
        console.log('Posting user...', user);
        const response = await fetch('http://localhost:3001/user', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (response.ok) {
            const resBody = response.json();
            console.log('resBody: ', resBody);
            return resBody;
        } else {
            return 'error'
        }
    },
    delete: async (id) => {
        console.log('Deleting user', id);
        const response = await fetch(`http://localhost:3001/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*'
            },
        });
        if (response.ok) {
            const resBody = response.json();
            console.log('resBody: ', resBody);
            return resBody;
        } else {
            console.log('ERROR')
            return 'error';
        }
    },
    put: async (user) => {
        console.log('Updating user');
        const response = await fetch(`http://localhost:3001/user/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (response.ok) {
            const resBody = response.json();
            console.log('resBody: ', resBody);
            return resBody;
        } else {
            return 'error'
        }
    }
}

export default api;