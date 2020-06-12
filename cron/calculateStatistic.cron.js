const {userService} = require('../service')

module.exports = async () => {

    let newVar = await userService.getUsers();

    console.log(newVar.length);

}
