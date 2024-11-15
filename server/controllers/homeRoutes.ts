import axios from 'axios';
const router = require('express').Router();

export default router.get('/', (req, res) => {
    axios
        .get('https://discit-api.fly.dev/disc')
        .then(({ data }) => {
        res.json(data);
        })
        .catch((err) => {
        console.error(err);
        res.json(err);
        });
});