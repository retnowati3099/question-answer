const Hapi = require("@hapi/hapi");
const routes2 = require("./routes2");

const init = async () => {
  const server = Hapi.server({
    port: 1999,
    host: "localhost",
  });

  server.route(routes2);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
