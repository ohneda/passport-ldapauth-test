require("dotenv").config();
var express = require("express"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  LdapStrategy = require("passport-ldapauth");

var OPTS = {
  server: {
    url: process.env.LDAP_URL,
    bindDN: process.env.LDAP_BIND_DN,
    bindCredentials: process.env.LDAP_BIND_CREDENTIALS,
    searchBase: process.env.LDAP_SEARCH_BASE,
    searchFilter: process.env.LDAP_SEARCH_FILTER,
  },
};

var app = express();

passport.use(new LdapStrategy(OPTS));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.post(
  "/login",
  function (req, res, next) {
    passport.authenticate("ldapauth", function (error, user, info) {
      if (res.headersSent) {
        return;
      }

      if (error) {
        console.error("LDAP error:", error);
        return res.status(401).send(error);
      }
      if (!user) {
        console.log("User not found");
        console.log("INFO:", info);
        return res.status(401).send(info);
      }

      console.log("USER:", user);
      req.user = user;
      return next();
    })(req, res);
  },
  function (req, res) {
    res.send(req.user);
  }
);

console.log("URL:", process.env.LDAP_URL);
console.log("BIND_DN:", process.env.LDAP_BIND_DN);
console.log("SEARCH_BASE:", process.env.LDAP_SEARCH_BASE);
console.log("SEARCH_FILTER:", process.env.LDAP_SEARCH_FILTER);
console.log("Server is running on port 8080");
app.listen(8080);
