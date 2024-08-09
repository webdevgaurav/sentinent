require("dotenv").config();
const app = require("./app");

const { PORT, NODE_ENV } = process.env;
app.listen(PORT, () => {
  console.log(`App running on port  ${PORT} in ${NODE_ENV} mode`);
});
