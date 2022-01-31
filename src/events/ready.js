const MONGODB_URL = process.env.MONGODB_URL;
const mongoose = require("mongoose");

module.exports = {
  name: "ready",
  run(client) {
    console.log(`Connected as ${client.user.tag}`);

    mongoose
      .connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.log("Unable to connect to MongoDB Database.\nError: " + err);
      });

    require("http")
      .createServer((req, res) => res.end("Behold! Mr.Hooman is alive!"))
      .listen(process.env.PORT || 3000);

    client.user.setPresence({
      activity: { name: `with Builders`, type: "LISTENING" },
    });
  },
};
