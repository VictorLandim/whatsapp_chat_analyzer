# Whatsapp chat analyzer

Current features: counts messages sent by each member in a group.\
WIP

# Instructions

1. Export whatsapp group chat text data. (Settings > Export chat > Skip media). Create a folder /data/ in the project root and paste the file `chat.txt`. Also create a folder named /result/;
2. Run `yarn` or `npm i`;
3. Generating a plot requires a [plotly](https://plot.ly/) key. Create a file `.env` to hold your credentials. Follow the format specified in `.env.example`. This step is not necessary as you can set `debug: true` in `config.js` to only generate text output;
4. Run `node index.js`;
