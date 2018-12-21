
const google = require('./google');

module.exports = (text, from, to) => {
    text = text.toLowerCase();
    return Promise.all([
        google(text, from, to)
    ]).then(results => {
        return {
            sentences: results[0]['sentences'].concat(results[1]['sentences']),
            src_pron: results[1].src_pron,
            dst_pron: results[1].dst_pron,
            synonyms: results[1].synonyms
        };
    });
};