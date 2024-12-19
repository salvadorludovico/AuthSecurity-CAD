const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Token = require('../models/token');


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciais inválidas!' });
        }

        const payload = {
            id: user._id,
            email: user.email
        };

        const accessToken = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_ACCESS_EXPIRATION }
        );

        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_REFRESH_EXPIRATION }
        )

        const token = new Token({accessToken, refreshToken, userId: user._id})
        token.save();

        return res.status(200).json({ 
            message: 'Login realizado com sucesso!',
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ message: 'Erro ao fazer login', error });
    }
}