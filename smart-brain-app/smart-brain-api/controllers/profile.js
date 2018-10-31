const redis = require('./signin').redis;

const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
}

const handleProfileUpdate = (req, res, db) => {
  const { id } = req.params;
  db('users').where({id}).update(req.body.formInput).returning('*')
    .then(response => {
      if (response) res.status(200).json(`Updated user ${response[0].name}!`);
      else res.status(400).json('Unable to update');
    })
    .catch(err => res.status(400).json('Error updating user'));
}

const handleSignOut = (req, res) => {
  const { authorization } = req.headers;
  if (authorization) {
    redis.exists(authorization, (err, reply) => {
      if (err || reply.length <= 0) return res.status(400).json('Unable to sign out');
      redis.del(authorization, (error, resp) => {
        if (error) return res.status(400).json('Unable to sign out');
        return res.status(200).json('Signed out');
      });
    })
  } else return res.status(400).json('Not authorized to sign out'); 
}

module.exports = {
  handleProfileGet,
  handleProfileUpdate,
  handleSignOut
}