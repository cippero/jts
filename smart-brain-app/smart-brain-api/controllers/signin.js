const jwt   = require('jsonwebtoken');
const redisModule = require('redis');

const redis = redisModule.createClient(process.env.REDIS_URI);

const handleSignin = (db, bcrypt, req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => user[0])
          .catch(err => Promise.reject('unable to get user'))
      } else return Promise.reject('wrong credentials')
    })
    .catch(err => Promise.reject('wrong credentials'))
}

const getAuthTokenId = (authorization) => {
  return redis.get(authorization, (err, id) => {
    if (err || !id) return Promise.reject('Unauthorized')
    return { id }
  })
}

const signToken = (payload) => {
  const jwtToken = { payload };
  return jwt.sign(jwtToken, process.env.JWT_SECRET, { expiresIn: '2 days'})
}

const setToken = (key, value) => {
  return Promise.resolve(redis.set(key, value))
}

const createSession = (user) => {
  const { email, id } = user;
  const token = signToken(email);
  return setToken(token, id)
    .then(() => ({ success: true, userId: id, token}))
    .catch(console.log)
}

const handleAuthentication = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  return authorization 
    ? getAuthTokenId(authorization)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json(err))
    : handleSignin(db, bcrypt, req, res)
        .then(data => {
          return data.id && data.email 
            ? createSession(data)
            : Promise.reject(data);
        })
        .then(session => res.status(200).json(session))
        .catch(err => res.status(400).json(err))
}

module.exports = {
  handleAuthentication
}