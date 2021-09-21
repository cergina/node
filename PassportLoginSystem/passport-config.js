// passport related info

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
    // done will be called after finished
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email) // returns user or null if no e-mail

        if (user == null) {
            return done(null, false, { message: 'No user with that e-mail'})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => { done(null, user.id) }) // serialize to store in session
    passport.deserializeUser((id, done) => { 
        return done(null, getUserById(id))
     }) // deserialize to get by id
}

module.exports = initialize
