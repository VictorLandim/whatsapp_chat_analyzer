const path = require('path');

// import .env variables
require('dotenv-safe').load({
    path: path.join(__dirname, '.env'),
    sample: path.join(__dirname, '.env.example')
});

module.exports.plotlyUser = process.env.PLOTLY_USER;
module.exports.plotlyKey = process.env.PLOTLY_KEY;

const blockedKeywordsPt = [
    'alterou',
    'saiu',
    'um administrador',
    'entrou',
    'adicionou',
    'removeu',
    'apagou',
    'participante',
    'adicionado',
    'removido'
];

const blockedKeywordsEn = [
    'icon',
    'added',
    'removed',
    'left',
    'description',
    'subject',
    'created',
    'joined',
    'invite',
    'encryption',
    'settings',
    'ERROR',
    'admin'
];

module.exports.blockedKeywords = blockedKeywordsPt.concat(blockedKeywordsEn);

module.exports.nameValues = {
    'Leonardo Kato K': 'KATO',
    lelécolecotelecoteco: 'KATO',
    'Victor Landim': 'Landim',
    Landim: 'LANDIM',
    Lalindo: 'LANDIM',
    'Bruno Gois': 'KYWAN',
    'Kevin Duran(Pit)': 'WEBER',
    'Grande Weber': 'WEBER',
    Priston: 'PRYSTHON',
    Hugo: 'LIMA',
    Schmitiz: 'SCHMITIZ',
    Glycon: 'SOUZA',
    'El Juan!': 'ARRUDA',
    Caio: 'ALMEIDA',
    'Ricardo Talley': 'TALLEY',
    'Lucas, O Douto': 'DOUTO',
    'O Felino Guerreiro Doutar': 'DOUTO',
    'Pedro de Carvalho Costa': 'CARVALHO',
    Pcc: 'CARVALHO',
    Prysthon: 'PRYSTHON',
    'Matheus Schmitz': 'SCHMITZ',
    'Sergio Magalhaes': 'JR',
    'Juan De Arruda': 'ARRUDA',
    'Caio C': 'ALMEIDA',
    'Hugo Lima': 'LIMA'
};
