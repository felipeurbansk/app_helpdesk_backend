const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


module.exports = {
    generateToken() {
        return jwt.sign({ id: this.id }, "secret", {
          expiresIn: 86400
        });
    }
}