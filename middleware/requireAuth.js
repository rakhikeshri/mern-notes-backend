import jwt from 'jsonwebtoken'
// import User from '../models/user'
import User from '../models/user.js'


async function requireAuth(req, res, next) {

    try{
        // read token off cookies
        const token = req.cookies.Authorization
        
        // decode the token
        const decoded = jwt.verify(token, process.env.SECRET)

        // Check expiration
        if(Date.now() > decoded.exp) return res.sendStatus(401)
        
        // find user using decoded sub
        const user = await User.findById(decoded.sub)
        if(!user) return res.sendStatus(401)
    
        // attach user to req
        req.user = user
    
        // continue on
        next()
    } catch (err){
        console.log('error', err)
        return res.sendStatus(401)
    }

}

export default requireAuth