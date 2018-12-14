var http = require("http");

http
  .createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Amigo Secreto Teste Deploy");
  })
  .listen(process.env.PORT || 3000);
