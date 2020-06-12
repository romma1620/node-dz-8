const {emailService} =require('../service');
const {emailActionEnum} = require('../constants');

module.exports = async (req, res) => {
    const user = req.body;
    await emailService.sendMail(
        user.email,
        emailActionEnum.USER_REGISTER,
        {userName: user.name}
    );

}

