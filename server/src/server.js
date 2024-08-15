import { app } from "./app.js";
import CONFIG from "./config/config.js";
import './database/dbConnect.js'

const PORT = CONFIG.PORT;

app.listen(PORT, () => {
  console.log(`server started at ${PORT} `);
});
