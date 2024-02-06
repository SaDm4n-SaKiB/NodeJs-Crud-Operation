const http = require('http');
const fs = require('fs');
const url = require('url');
const multer = require('multer');


http.createServer((req, res) => {
  console.log(`Server listening on port ${5500}`);

  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is Home Page');
  } 
  else if (parsedUrl.pathname === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is About Page');
  } 
  else if (parsedUrl.pathname === '/contact') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is Contact Page');
  } 
  else if (parsedUrl.pathname === '/file-write') {
    fs.writeFile('demo.txt', 'hello world', (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('Internal Server Error');
      } 
      else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('File "demo.txt" created and text written');
      }
      res.end();
    });
    return;
  } 
  else if (parsedUrl.pathname === '/upload') {

    const upload = multer({ dest: 'uploads/' });

    upload.single('file')(req, res, (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('Internal Server Error');
      } 
      else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('File uploaded successfully');
      }
      res.end();
    });
    return; 
  } 
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('Not Found');
  }

  res.end();
}).listen(5500,function(){
  console.log("Server is Running..........")
});
