const {emailActionEnum} = require('../constants');

module.exports = {
    [emailActionEnum.USER_REGISTER]: {
        subject: '[HIRE!] Hire people',
        templateFileName: 'userRegister'
    },

    [emailActionEnum.USER_REFRESH]: {
        subject:'[HIRE!] Refresh user',
        templateFileName: 'userRefresh'
    },

    [emailActionEnum.USER_DELETE]: {
        subject:'[HIRE!] Delete user',
        templateFileName: 'userDelete'
    },

    [emailActionEnum.USER_UPDATE]: {
        subject:'[HIRE!] Update user',
        templateFileName: 'userUpdate'
    },
}

