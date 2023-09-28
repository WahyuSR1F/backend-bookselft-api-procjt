// konfigurasi server

const Hapi = require('@hapi/hapi');
// import routes file
const routes = require('./routes');

const init = async () => {
  // configuration server
  const server = Hapi.server({
    port: 9000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      // add a cors to access with another of origin
      cors: {
        origin: ['*'],
      },
    },
  });
  // add routes handling
  server.route(routes);

  // start severed
  await server.start();
  console.log('Server running on %s', server.info.uri);
};
// error exception handling
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
