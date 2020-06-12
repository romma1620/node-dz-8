const {emailService, userService} = require('../service');
const {emailActionEnum} = require('../constants');

module.exports = async () => {
    try {
        const users = await userService.getUsersByParams({photo: null});

        for (const user of users) {
            console.log("============================")
            console.log(user)
            console.log("============================")
            await emailService.sendMail(
                user.email,
                emailActionEnum.USER_REMIND,
                {userName: user.name}
            );
        }

    } catch (e) {
        console.log(e);
    }


}
