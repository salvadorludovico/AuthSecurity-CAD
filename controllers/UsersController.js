const User = require('../models/user');

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

exports.readUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao buscar usuários', error });
    }
};

exports.readUser = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({email});
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao buscar usuários', error });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const oldEmail = req.params.email;
        const user = await User.findOne({email: oldEmail})
        
        if (!user) {
            return res.status(404).json({ message: 'Usuário não foi encontrado'});
        }

        const result = await user.updateOne(req.body)

        if (result.modifiedCount < 1) {
            return res.status(200).json({ message: 'Usuário não precisou ser atualizado!' });
        }

        return res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao atualizar usuário', error });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const email = req.params.email;
        const result = await User.deleteOne({email})

        if (result.deletedCount < 1) {
            return res.status(404).json({message: 'Usuário não foi encontrado'})
        }

        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao deletar usuário', error });
    }
};