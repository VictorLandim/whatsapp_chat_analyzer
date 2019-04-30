const { readFileSync, writeFileSync } = require('fs');
const { nameValues, blockedKeywords } = require('./const');

module.exports = (platform, origin, dest, filename, maxSize, debug) =>
    new Promise(resolve => {
        const messages = readFileSync(`${origin}/${filename}`, 'utf8').split('\n');

        const response = {};

        messages.forEach(m => {
            if (isMessageInvalid(m, blockedKeywords, platform)) return;

            // TODO: play with dates
            const { date, time, author } = getMessageDetails(m, platform);

            let authorSanitized = '';

            Object.keys(nameValues).forEach(e => {
                if (author.indexOf(e) >= 0) {
                    authorSanitized = nameValues[e];
                } else {
                    authorSanitized = author;
                }
            });

            // chill for now
            authorSanitized = author;

            if (authorSanitized) {
                // aliases
                if (authorSanitized.indexOf('9927') >= 0) authorSanitized = 'Bruno Gois';
                if (authorSanitized.indexOf('9127') >= 0) authorSanitized = 'Leandro K.';
                if (authorSanitized.indexOf('Carneiro') >= 0) authorSanitized = 'Caio Almeida';
                if (authorSanitized.indexOf('Hugo') >= 0) authorSanitized = 'Hugo Lima';

                // increment count if key exists
                response[authorSanitized] = response[authorSanitized]
                    ? response[authorSanitized] + 1
                    : 1;
            }
        });

        const writeData = debug
            ? Object.keys(response)
                  .sort((a, b) => response[b] - response[a])
                  .map(e => `${e}: ${response[e]}`)
                  .slice(0, maxSize)
                  .join('\n')
            : JSON.stringify(
                  Object.keys(response)
                      .sort((a, b) => response[b] - response[a])
                      .slice(0, maxSize)
                      .map(e => ({ key: e, value: response[e] }))
              );

        const resultFileName = filename.replace('.txt', '_result.txt');

        writeFileSync(`${dest}/${resultFileName}`, writeData, 'utf8');
        resolve(resultFileName);
    });

// util functions
const isMessageInvalid = (msg, blockedKeywords, platform) =>
    messageContainsBlockedKeywords(msg, blockedKeywords) || !messageContainsDate(msg, platform);

const messageContainsBlockedKeywords = (msg, blockedKeywords) =>
    blockedKeywords.reduce((result, current) => result || msg.indexOf(current) >= 0, false);

const messageContainsDate = (msg, platform) => {
    if (platform === 'ios') {
        return (
            msg.split('[')[1] && msg.split('[')[1].split(' ')[0] && msg.split(']')[0].split(' ')[1]
        );
    } else if (platform === 'android') {
        return msg.split(', ')[0] && msg.split(', ')[1];
    } else throw new Error(`Invalid platform ${platform}.`);
};

const getMessageDetails = (msg, platform) => {
    if (platform === 'ios') {
        return {
            date: msg.split('[')[1].split(' ')[0],
            time: msg.split(']')[0].split(' ')[1],
            author: msg.split('] ')[1] ? msg.split('] ')[1].split(': ')[0] : ''
        };
    } else if (platform === 'android') {
        return {
            date: msg.split(', ')[0] || '',
            time: msg.split(', ')[1],
            author: msg.split(' - ')[1] ? msg.split(' - ')[1].split(':')[0] : ''
        };
    } else throw new Error(`Invalid platform ${platform}.`);
};
