const processFile = require('./processFile.js');
const makeChart = require('./chart.js');
const { debug, groupSize } = require('./const');

(async () => {
    const file = 'chat.txt';
    const origin = './data/';
    const dest = './result';
    const platform = 'ios';

    const resultFilePath = await processFile(platform, origin, dest, file, groupSize, debug);
    console.log('> File saved.');

    if (!debug) {
        await makeChart(resultFilePath);
        console.log('> Chart generated.');
    }
})();
