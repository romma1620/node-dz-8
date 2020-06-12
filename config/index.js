module.exports = {
    PORT: process.env.PORT || 1616,

    ROOT_EMAIL: process.env.ROOT_EMAIL || 'wrong email',
    ROOT_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || 'wrong password',
    ROOT_SERVICE: process.env.ROOT_EMAIL_SERVICE || 'gmail',

    FRONTEND_URL: process.env.FRONTEND_URl || 'http://localhost:1616',

    DB_USER: process.env.DB_USER || 'root',
    DB_PASS: process.env.DB_PASS || 'root',

    CRON_JOB_INTERVAL: process.env.CRON_JOB_INTERVAL || 'wrong interval'
}
