const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8000;
const base = path.join(__dirname);
const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  try {
    let reqPath = decodeURIComponent(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const fp = path.join(base, reqPath);
    fs.stat(fp, (err, stat) => {
      if (err || !stat.isFile()) {
        res.statusCode = 404;
        res.end('Not found');
        return;
      }
      const ext = path.extname(fp).toLowerCase();
      res.setHeader('Content-Type', mime[ext] || 'application/octet-stream');
      const stream = fs.createReadStream(fp);
      stream.on('error', () => { res.statusCode = 500; res.end('Server error'); });
      stream.pipe(res);
    });
  } catch (e) {
    res.statusCode = 500;
    res.end('Server error');
  }
});

server.listen(port, () => console.log(`Static server running on http://localhost:${port}`));
