// app/routes.js

var Checkpoint = require('../app/models/checkpoint');

module.exports = function (app, passport) {

	app.get('/', function (req, res) {
		res.render('index.ejs');
	});

	app.get('/simulation', isLoggedIn, function (req, res) {
		res.render('simulation.ejs', {
			email: "dum"//req.user.local.email
		});
	});

	app.get('/login', function (req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile', // redirect to the secure profile section
		failureRedirect: '/login', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));

	app.post('/save', isLoggedIn, function (req, res) {
		var obj = req.body;
		res.send(200);
		var temp = new Checkpoint(obj);
		temp.save(function (err) {
			if (err) return console.error(err);
		});
	});

	app.post('/load', isLoggedIn, function (req, res) {

	});

	app.get('/signup', function (req, res) {
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile', // redirect to the secure profile section
		failureRedirect: '/signup', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));

	app.get('/profile', isLoggedIn, function (req, res) {
		res.render('profile.ejs', {
			user: req.user // get the user out of session and pass to template
		});
	});

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
	return next();
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
