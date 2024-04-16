require("dotenv").config();

const port = process.env.PORT || 3000;
const dbLink = process.env.DATABASE_URL
const encryptKey = process.env.ENCRYPT_KEY;


module.exports={
    port,
    dbLink,
    encryptKey,
}