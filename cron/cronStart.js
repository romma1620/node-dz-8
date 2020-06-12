const cron = require('node-cron');


const calculateStatisticCron = require('./calculateStatistic.cron')
const {CRON_JOB_INTERVAL} = require('../config')

module.exports = () => {
    cron.schedule(CRON_JOB_INTERVAL, async () => {
        console.log(`CRON START AT ${new Date().toISOString()}`)
        try {

            await calculateStatisticCron();

        } catch (e) {
            console.log(
                `CRON FINISHED AT 
                ${new Date().toISOString()} \n 
                ${JSON.stringify(e, null, 2)}`
            )
        }
    })


}

