const Tick = require('../models/tick.js');
const MetaData = require('../models/metadata.js');

exports.tick_time_bucket = function(time_bucket) {
    let date_min = new Date(time_bucket);
    let date_max = new Date(date_min);
    date_max.setHours(date_max.getHours() + 1);
    return Tick.find({dtg: { $gte: date_min, $lt: date_max }}).lean({ virtuals: true }).exec();
}

exports.tick_time_bucket_unique = function(time_bucket, limit) {
    // returns the earliest set of top 'limit' assets for given time_bucket
    return new Promise(async function(resolve, reject) {
        let ticks = await exports.tick_time_bucket(time_bucket);
        ticks.sort(function(a,b) {
            return b['dtg'] > a['dtg'] ? 1 : (b['dtg'] < a['dtg'] ? -1 : 0);
        });
        let ticks_obj = {};
        for (let tick of ticks) {
            ticks_obj[tick.symbol] = tick;
        }
        // Now we have an object with unique ticks, grab the highest 'limit'
        let ticks_array = Object.entries(ticks_obj).map(e=>e[1]);
        ticks_array.sort(function(a,b) {
            return b['marketcap'] > a['marketcap'] ? 1 : (b['marketcap'] < a['marketcap'] ? -1 : 0);
        });
        resolve(ticks_array.slice(0,limit));
        return;
    });
}

exports.tick_symbol_since = function(symbol, no_earlier_than) {
    return Tick.find({
        '$and': [
            { symbol: symbol },
            { dtg: { '$gte': no_earlier_than } }
        ]
    }).lean({virtuals: true}).exec();
}

exports.metadata_symbol = function(symbol) {
    return MetaData.find({symbol: symbol}).lean({ virtuals: true }).exec();
}

exports.metadata_symbols = function(symbols) {
    return MetaData.find({symbol: { '$in': symbols }}).lean({ virtuals: true}).exec();
}