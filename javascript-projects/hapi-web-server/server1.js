const Hapi = require("@hapi/hapi");
const routes1 = require("./routes1");

const init = async () => {
  const server = Hapi.server({
    port: 3008,
    host: "localhost",
  });

  server.route(routes1);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
