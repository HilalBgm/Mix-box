const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user');

module.exports = (passport) => {
  // passport needs ability to serialize and unserialize users out of session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((user, done)=> {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // local signup, by default if there is no name, it would be called 'local'
  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  (req, email, password, done) => {
    // User.findOne wont fire unless data is sent back
    process.nextTick(()=> {
      // find a user whose email is the same as the forms email, we are checking to see if the user trying to login already exists
      User.findOne({'local.email' : email}, (err, user) =>{
        if(err)
          return done(err);
        if(user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken'));
        } else {
          const newUser = new User();
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          newUser.save((err) => {
            if(err)
              throw err;
            return  done(null, newUser);
          });
        }
      });
    });
}));
};
