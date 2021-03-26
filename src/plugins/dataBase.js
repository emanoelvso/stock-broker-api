const mongoose = require("mongoose");
const config = require("../config");
const log = require("../logger");

const createConnection = async (instance) => {
  const defaultConfig = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

  const connection = await mongoose.connect(config.db.uri || "", defaultConfig);

  log.info(`Database connected`);

  instance.addHook("onClose", () => connection.disconnect());
  instance.decorate("conn", connection);
};

module.exports = createConnection;
