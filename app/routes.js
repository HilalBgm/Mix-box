module.exports = (app, passport)=> {

// Homepage
  app.get('/', (req, res)=> {
    res.render('index.ejs');
  });

// login
app.get('/login', (req, res) =>{
  res.render('login.ejs', {message: req.flash('loginMessage')} );
})

// process the login form
// app.post('/login', do all our passport stuff here);

// signup
app.get('/signup',(req, res)=> {
  res.render('signup.ejs', {message: req.flash('signupMessage')} );
});

app.post('/signup', passport.authenticate('local-signup', {
  succesRedirect : '/profile',
  failureRedirect : '/signup',
  failureFlash : true
}));

// process the signup form
// app.post('/signup', do all our passport stuff here);

// route middleware
const isLoggedIn = (req, res, next)=> {
  if(req.isAuthenticated())
  return next();
  res.redirect('/');
}
// profile
app.get('/profile', isLoggedIn, (req, res)=> {
  res.render('profile.ejs', {user : req.user});
});

// logout
app.get('/logout', (req, res)=>{
  req.logout();
  res.redirect('/');
});

}
