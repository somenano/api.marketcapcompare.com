var mongoose = require('mongoose');
var mongooseLeanVirtuals = require('mongoose-lean-virtuals');

var js_helper = require('../helpers/js.js');

var Schema = mongoose.Schema;

var TickSchema = new Schema({
    dtg: {
        type: Date,
        default: Date.now,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    marketcap: {
        type: Number,
        required: true
    },
    volume_24h: {
        type: Number,
        required: true
    },
    reddit_subs_total: {
        type: Number,
        required: false
    },
    reddit_subs_active: {
        type: Number,
        required: false
    }

},{
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

TickSchema.virtual('symbol_lower')
    .get(function() {
        return this.symbol.toLowerCase();
    });

TickSchema.virtual('time_bucket')
    .get(function() {
        // console.log('time_bucket called ' + new Date(this.dtg).YYYYMMDDHH());
        return new Date(this.dtg).YYYYMMDDHH();
    });

TickSchema.virtual('time_identifier')
    .get(function() {
        return js_helper.getTimeIdentifier(this.time_bucket, this.symbol);
    });

TickSchema.plugin(mongooseLeanVirtuals);

module.exports = mongoose.model('tick', TickSchema);