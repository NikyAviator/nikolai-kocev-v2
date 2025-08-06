// AUTH WITH BCRYPT AND JWT
const requireAuth = (req, res, next) => {
  console.log('Require Auth Middleware, hello!');

  next();
};

export default requireAuth;
