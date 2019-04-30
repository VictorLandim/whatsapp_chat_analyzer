const { readFileSync } = require('fs');
const { plotlyUser, plotlyKey } = require('./const');
const plotly = require('plotly')(plotlyUser, plotlyKey);

module.exports = filePath =>
    new Promise(resolve => {
        const messages = JSON.parse(readFileSync(filePath, 'utf8'));

        const data = [
            {
                x: messages.map(e => e.key),
                y: messages.map(e => e.value),
                type: 'bar'
            }
        ];

        const graphOptions = { filename: 'chart', fileopt: 'overwrite' };

        plotly.plot(data, graphOptions, (err, msg) => {
            if (err) return reject(err);
            if (msg) console.log(msg);
            resolve();
        });
    });
