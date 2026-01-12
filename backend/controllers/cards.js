module.exports.updateProfile = (req, res) => {
    const { name, about } = req.body;

    User.findByIdAndUpdate(
        req.user._id,
        { name, about },
        { new: true, runValidators: true },
    )
        .then((user) => {
            if (!user) return res.status(404).send({ message: 'Usuario no encontrado' });

            return res.send({
                _id: user._id,
                name: user.name,
                about: user.about,
                avatar: user.avatar,
                email: user.email,
            });
        })
        .catch(() => res.status(500).send({ message: 'Error del servidor' }));
};
