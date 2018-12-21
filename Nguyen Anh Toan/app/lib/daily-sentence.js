
const { node_fetch } = require('../cfg/develop_config');
if (node_fetch) {
    eval('var fetch = require(\'node-fetch\')');
}

const { printf } = require('./yukimilib');

const crawlDailySentence = (date) => {
    date = `${date.getFullYear()}-${printf('%02d', date.getMonth() + 1)}-${printf('%02d', date.getDate())}`;
    const url = `http://sentence.iciba.com/index.php?c=dailysentence&m=getdetail&title=${date}`;
    return fetch(encodeURI(url))
        .then(res => res.text())
        .then(body => {
            const json = JSON.parse(body);
            return {
                date: json['title'],
                sentence: json['content'],
                
                thumbnail: json['picture'],
                image: json['picture2']
            };
        });
};

const getDailySentence = (count) => {
    if (count > 6) {
        throw new Error('getDailySentence: count <= 6');
    }

    let promises = [],
        date = new Date();


    for (; count > 0; --count) {
        promises.push(crawlDailySentence(date));
        date.setMonth(date.getMonth() - 1);
    }

    return Promise.all(promises);
};

module.exports = getDailySentence;