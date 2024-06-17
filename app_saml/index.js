require('dotenv').config();

const express = require('express');
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const session = require('cookie-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require("path");

const app = express();

const port = process.env.PORT;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'secret_key',
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

const cert = fs.readFileSync(process.env.CERTIFICATE, "utf-8");

passport.use(new SamlStrategy(
    {
        entryPoint: process.env.SAML_ENTRY,
        callbackUrl: process.env.CALLBACK_URL,
        issuer: "app-saml",
        cert,
    },
    (profile, done) => {
        return done(null, profile);
    }
));

app.get('/login',
    passport.authenticate('saml', {failureRedirect: '/', failureFlash: true}),
    (req, res) => {
        res.redirect('/');
    }
);

app.post('/login/callback',
    passport.authenticate('saml', {failureRedirect: '/', failureFlash: true}),
    (req, res) => {
        res.redirect('/');
    }
);

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

const data = [
    {"title": "The Shawshank Redemption", "director": "Frank Darabont", "year": 1994},
    {"title": "The Godfather", "director": "Francis Ford Coppola", "year": 1972},
    {"title": "The Dark Knight", "director": "Christopher Nolan", "year": 2008},
    {"title": "Pulp Fiction", "director": "Quentin Tarantino", "year": 1994},
    {"title": "Schindler's List", "director": "Steven Spielberg", "year": 1993},
    {"title": "The Lord of the Rings: The Return of the King", "director": "Peter Jackson", "year": 2003},
    {"title": "Forrest Gump", "director": "Robert Zemeckis", "year": 1994},
    {"title": "Inception", "director": "Christopher Nolan", "year": 2010},
    {"title": "Fight Club", "director": "David Fincher", "year": 1999},
    {"title": "The Matrix", "director": "Lana Wachowski, Lilly Wachowski", "year": 1999}
]

app.get('/',
    (req, res) => {
        const hasAuth = req.user !== undefined;
        const name = hasAuth && `${req.user.firstName} ${req.user.lastName}`;

        res.render('index', {hasAuth, name, data});
    }
);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
