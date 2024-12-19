const jwt = require('jsonwebtoken');
const User = require('../models/user')
const Token = require('../models/token')

const validateToken = async (req, res, next) => {
    const tokenHeader = req.headers.authorization?.split(' ')[1]; // Bearer token

    if (!tokenHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const token =  await Token.findOne({accessToken: tokenHeader})

        if (!token) {
            throw new Error("Token não encontrado no banco de dados");
        }

        const {accessToken, refreshToken, userId} = token;

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

        const user =  await User.findOne({email: req.params.email})
        
        console.log(user)

        if (!userId.equals(user._id))  {
            throw new Error("Token não pertence ao usuário requisitado");
        }

        //console.log(decoded)
        //req.user = decoded;

        next();
    } catch (err) {
        console.error(err)
        return res.status(403).json({ message: 'Token inválido ou expirado' });
    }
};

module.exports = validateToken;
