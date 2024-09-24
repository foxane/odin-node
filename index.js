const http = require('node:http');
const fs = require('fs/promises');
const url = require('url');

const port = 8080;

http
  .createServer(async (req, res) => {
    const query = url.parse(req.url, true);
    const path = `.${query.pathname === '/' ? '/index' : query.pathname}.html`;

    try {
      const data = await fs.readFile(path, 'utf-8');
      res.writeHead(200, { 'content-type': 'text/html' });
      res.write(data);
    } catch (error) {
      const errorPage = await fs.readFile('./404.html', 'utf-8');
      res.writeHead(404, { 'content-type': 'text/html' });
      res.write(errorPage);
      console.log(error);
    } finally {
      res.end();
    }
  })
  .listen(port);

console.log(`Server started at : http://localhost:${port}`);
