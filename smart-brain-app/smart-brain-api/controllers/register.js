const redis = require('./signin').redis;
const jwt = require('./signin').jwt;

const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            createSession(user)
              .then(session => res.status(200).json(session))
              .catch(err => res.status(400).json(err))
            // res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => { console.log(err); res.status(400).json('unable to register'); });
}

const signToken = (payload) => {
  const jwtToken = { payload };
  return jwt.sign(jwtToken, process.env.JWT_SECRET, { expiresIn: '2 days'})
}

const setToken = (key, value) => {
  console.log({key, value});
  return Promise.resolve(redis.set(key, value))
}

const createSession = (user) => {
  console.log({user});
  const { email, id } = user[0];
  const token = signToken(email);
  return setToken(token, id)
    .then(() => ({ success: true, userId: id, token}))
    .catch(console.log)
}

module.exports = { handleRegister }


