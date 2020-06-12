const {emailService, userService} = require('../service');
const {emailActionEnum} = require('../constants');

module.exports = async () => {
    try {
        const users = await userService.getUserWithoutPhoto();
        console.log("==================================")
        console.log(users)
        console.log("==================================")

        for (const user of users) {
            const name = user.name;
            const email = user.email;
            await emailService.sendMail(
                email,
                emailActionEnum.USER_REGISTER,
                {userName: name}
            );
        }

    } catch (e) {
        console.log(e);
    }


}
