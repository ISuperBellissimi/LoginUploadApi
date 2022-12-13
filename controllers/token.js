const jwt = require('jsonwebtoken');


const TOKEN_EXPIRATION = 60*60*24;    // 24 ore

// creo token. Input: email e id (eventualmente altri dati)
const createToken = (email, id, isArtista)=>{
  var payload = {email: email, id: id, is_artista: isArtista}
  var options = {expiresIn: TOKEN_EXPIRATION}
  return jwt.sign(payload, process.env.SUPER_SECRET, options);
}

const checkToken = (req, res, next) => {
  // header or url parameters or post parameters
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  console.log(token);
  if (!token) return res.status(401).json({success:false, message:'Nessun token fornito'})
  // decode token, verifies secret and checks expiration
  jwt.verify(token, process.env.SUPER_SECRET, function(err, decoded) {
  if (err) return res.status(403).json({success:false, message:'Token not valid'})
  else {
      // if everything is good, save in req object for use in other routes
      req.loggedUser = decoded;
      next();
    }
  });
}


module.exports = {
  createToken,
  checkToken
};
