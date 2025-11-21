require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { sequelize } = require('./models');
const socketUtil = require('./utils/socket');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// routes
app.use('/api/payments', require('./routes/payments'));
app.use('/api/nach', require('./routes/nach'));

// demo routes (listings)
app.use('/api/loans', require('./routes/loans'));
app.use('/api/payments', require('./routes/paymentsIndex'));

// health
app.get('/health', (req, res) => res.json({ ok: true }));

const server = http.createServer(app);
const io = socketUtil.init(server);

// sync DB and start
(async () => {
  try{
    await sequelize.sync({ alter: true });
    const port = process.env.PORT || 4000;
    server.listen(port, () => console.log(`Server listening on ${port}`));
  }catch(e){
    console.error('Failed to start', e);
  }
})();
