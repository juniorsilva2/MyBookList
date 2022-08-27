const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();

const client = redis.createClient({url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`});
// const client = redis.createClient({url: 'redis://localhost:6379'});

const connectToRedis = async () => {
    try {
        await client.connect();
        console.log('Conexão com o banco bem sucedida!')
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    connectToRedis,
    client,
}