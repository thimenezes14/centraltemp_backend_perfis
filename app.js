const app = require('./api/config/server');
const {PORT} = require('./.env'); // || 3000
require('./api/database');
app.listen(PORT, () => console.log("Serviço de perfis online!"));