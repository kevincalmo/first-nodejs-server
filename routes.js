const fs = require('fs'); //file systeme

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head> <title> My first page </title> </head>');
        res.write("<body><h1>Hello World</h1><form method='POST' action='/message'><input type='text' name='message' > <button type='submit'>send</button>'</form></body>");
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
            console.log(body);
        });//data event
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
            fs.writeFileSync('message.txt', message);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html>');
    res.write('<head> <title> My first page </title> </head>');
    res.write('<body><h1>Hello from my Node.JS Server!</h1></body>');
    res.write('</html>');
    res.end();
    //console.log(req);
    //console.log(res);
}

module.exports = requestHandler;