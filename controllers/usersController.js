import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    try {
        // get the email and pass off req body
        const { firstName, lastName, email, password } = req.body

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 8)

        // create a user with the req body
        await User.create({ firstName, lastName, email, password: hashedPassword })

        // respond
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(400)
    }
}

export const login = async (req, res) => {
    try {

        // get the email and password off the req body
        const { email, password } = req.body

        // find the user with requested email
        const user = await User.findOne({ email })
        if (!user) return res.sendStatus(401)

        // compare sent in password with found user password hash
        const passwordMatch = bcrypt.compareSync(password, user.password)
        if (!passwordMatch) return res.sendStatus(401)

        // create a jwt token

        // Date.now() gives no of milliseconds since since 1970 something
        // * 1000 expires within a second , * 60 expires within a minute * 60 expires within an hour * 24 expires within a day * 30 = expires within 30 day   
        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30
        const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET)

        // set the cookie
        res.cookie("Authorization", token, {
            expires: new Date(exp),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        })

        // sent the token
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}

export const logout = async (req, res) => {
    try {
        // await res.clearCookie("Authorization"); // Clear the "Authorization" cookie
        // res.sendStatus(200);

        // res.clearCookie('Authorization').status(200).json("logout success")
        // res.clearCookie('Authorization');
        res.cookie("Authorization", ' ', { maxAge: 1 })
        res.sendStatus(200);

    } catch (err) {
        console.error('Error clearing cookie:', err);
        res.sendStatus(500); // Internal server error
    }
}

export const checkAuth = (req, res) => {
    try {
        // Assuming req.user contains user information
        const user = req.user;
        // Sending user information in the response
        res.status(200).json({ user });
        //respond with the note
    } catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }
}