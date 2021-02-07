const { User } = require('../sequelize');

module.exports = function(app) {
    
    app.get('/users', (req, res) => {
        console.log('get users..');
        
        // res.json({test: 'hi'});
        User.findAll().then(users => {
            res.json(users);
        });
    });

    app.post('/user', (req, res) => {
        console.log('user: ', req.body);
        User.create(req.body)
        .then(user => res.json(user))
    });

    app.put('/user/:id', (req, res) => {
        console.log('making a PUT on user, ', req.params.id);
        console.log(req.body)
        User.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(user => res.json(user))
    })

    app.delete('/user/:id', (req, res) => {
        console.log('Deleting user', req.params.id);
        User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(user => res.json(user))
    })


}