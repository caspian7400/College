const IPFS = require('ipfs-infura');
const fs = require('fs');
require('dotenv').config();
const ipfs = new IPFS({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    projectId: `${process.env.PROEJCT_ID}`,
    projectSecret: `${process.env.PROEJCT_SECRET}`,
});
const filePath = './files/VL2023240105862_AST01.pdf';
const fileBuffer = fs.readFileSync(filePath, 'utf8');
ipfs.add(fileBuffer).then((res) => console.log(res));
