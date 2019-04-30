const processFile = require('./processFile.js');
const makeChart = require('./chart.js');

(async () => {
    const file = 'chat.txt';
    const origin = './data/';
    const dest = './result';
    const platform = 'ios';
    const debug = true;

    // magic number: number of members
    const maxSize = 16;

    const resultFilePath = await processFile(platform, origin, dest, file, maxSize, debug);
    console.log('> File saved.');

    if (!debug) {
        await makeChart(resultFilePath);
        console.log('> Chart generated.');
    }
})();
