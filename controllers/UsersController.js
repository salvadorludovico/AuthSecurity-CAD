const User = require('../models/User');

exports.createUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = new User({ email, password });
        await user.save();
        return res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao criar usuário', error });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao buscar usuários', error });
    }
};

exports.getUser = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.find({email: email});
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao buscar usuários', error });
    }
}