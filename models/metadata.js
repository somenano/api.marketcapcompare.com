var mongoose = require('mongoose');
var mongooseLeanVirtuals = require('mongoose-lean-virtuals');

var js_helper = require('../helpers/js.js');

var Schema = mongoose.Schema;

var MetaDataSchema = new Schema({
    date_updated: {
        type: Date,
        default: Date.now,
        required: true
    },
    symbol: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    subreddit: {
        type: String,
        required: false
    },
    twitter: {
        type: String,
        required: false
    },
    logo: {
        type: String,
        required: false
    },
},{
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

MetaDataSchema.virtual('symbol_lower')
    .get(function() {
        return this.symbol.toLowerCase();
    });

MetaDataSchema.plugin(mongooseLeanVirtuals);

module.exports = mongoose.model('metadata', MetaDataSchema);