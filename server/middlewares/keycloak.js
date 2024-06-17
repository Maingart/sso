const Keycloak = require("keycloak-connect");
const dotenv = require('dotenv').config();

module.exports = new Keycloak({}, {
    "realm": process.env.KEYCLOAK_REALM,
    "auth-server-url": process.env.KEYCLOAK_URL,
    "ssl-required": "external",
    "bearer-only": true,
});