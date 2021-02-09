const { User } = require('../sequelize');

module.exports = function(app) {
    
    app.get('/users', (req, res) => {
        User.findAll().then(users => {
            res.json(users);
        });
    });

    app.post('/user', (req, res) => {
        User.create(req.body)
            .then(user => res.json(user))
    });

    app.put('/user/:id', (req, res) => {
        User.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(user => res.json(user))
    })

    app.delete('/user/:id', (req, res) => {
        User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(user => res.json(user))
    })


}