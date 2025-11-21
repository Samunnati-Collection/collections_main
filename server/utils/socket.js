let io;
module.exports = {
  init: (server) => {
    const { Server } = require('socket.io');
    io = new Server(server, { cors: { origin: '*' } });
    io.on('connection', (socket) => {
      console.log('socket connected', socket.id);
    });
    return io;
  },
  get: () => io
};
