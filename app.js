import {createServer} from 'http';
import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';

const PORT = 8080
const server = createServer((req, res)=>{
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathName = parsedUrl.pathname;

    let fileName;

    switch(pathName){
        case '/':
            fileName = 'index.html';
            break;
        case '/about':
            fileName = 'about.html';
            break;
        case '/contact-me':
            fileName = 'contact-me.html';
            break;
        default:
            fileName = '404.html';
            break;
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, fileName);

    async function sendData() {
        try {
            const data = await fs.readFile(filePath);
            const statusCode = fileName === '404.html'? 404 : 200;

            res.writeHead(statusCode, {"content-type": 'text/html'});
            res.end(data);
        } catch (error) {
            console.log(error)
        }
    }
    sendData()
})

server.listen(PORT, ()=>{console.log(`Server running on http://localhost:${PORT}`)})