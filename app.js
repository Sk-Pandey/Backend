const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Hi");
  process.exit();
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is Listening at http://localhost:${PORT}`);
});
