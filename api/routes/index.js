const app = require('express')();
const rotaPerfis = require('./routesPath/perfis');

app.use(rotaPerfis);
app.use((req, res, next) => {
    console.log(req.params.teste);
    res.status(404).json({err: "Rota não existente."});
});

module.exports = app;