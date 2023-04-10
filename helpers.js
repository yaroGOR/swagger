const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const logger = require('./winston')




const parseBody = async (req)=> {
    try {
    const buffer = []
    for await (const chunk of req) {
        buffer.push(chunk)
    }
    const data = Buffer.concat(buffer).toString()
    req.body = JSON.parse(data)
    return 
} catch(err) {
    logger.error(err)
    console.log('Error while parsing')
}
}


const cryptPassword =async  (passwordFromUser)=> {
    var salt = bcrypt.genSaltSync(10);
     var passwordToSave =await bcrypt.hash(passwordFromUser, salt)
    return passwordToSave    
}
const checkPassword = async  (passwordFromUser, savedPassword) => {
    try {
        console.log(passwordFromUser, savedPassword)

    const result = await bcrypt.compare(passwordFromUser, savedPassword)
    console.log(result)
    return result
    } catch (error) {
        console.log(error)
    }
}


const generateToken = (username) =>{

    const jwtKey = process.env.JWT
    const jwtExpirySeconds = 24*60*60
const token = jwt.sign({username}, jwtKey, {algorithm:"HS256", expiresIn: jwtExpirySeconds,})
return token
}


const verifyToken = (token) => {
    const jwtKey = process.env.JWT
    if (!token) {
        return false
    }
    try {
        payload = jwt.verify(token, jwtKey)
        return payload.username
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            // error cause JWT is unathorized
            console.log('Wrong JWT')
            return false
        } else {
            throw error
        }
         
    }

}

const writeToFile = (post, title) => {
    try {
    fs.writeFileSync(path.join( 'posts', title+'.txt'),JSON.stringify(post))
    } catch (err){
        if (err) {
            throw err
        }
    }
}


module.exports = {parseBody, cryptPassword, checkPassword, generateToken, verifyToken, writeToFile}