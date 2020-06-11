const EmailTemplates = require('email-templates')
const nodemailer = require('nodemailer');
const path = require('path')

const {ROOT_EMAIL, ROOT_PASSWORD, ROOT_SERVICE, FRONTEND_URL} = require('../config')
const htmlTemplates = require('../emailTemplates')

const transporter = nodemailer.createTransport({
    service: ROOT_SERVICE,
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_PASSWORD
    }
});

const emailTemplates = new EmailTemplates({
    message: null,
    views: {
        root: path.join(process.cwd(), '/emailTemplates/')
    }
})

class EmailService {
    async sendMail(userEmail, action, context) {
        try {
            const templateInfo = htmlTemplates[action];

            const html = await emailTemplates.render(templateInfo.templateFileName,
                {
                    ...context,
                    frontendUrl: FRONTEND_URL
                }
            )

            const mailOptions = {
                from: 'Hire_Assistant',
                to: userEmail,
                subject: templateInfo.subject,
                html
            };

            return transporter.sendMail(mailOptions);
        } catch (e) {
            console.log(e)
        }

    }
}

module.exports = new EmailService()


