import path from 'path';
import {fileURLToPath} from 'url';
import express from 'express';
const PORT = 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
    
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.get('/about', (req,res)=>{
    res.sendFile(path.join(__dirname, 'about.html'))
})
app.get('/contact-me', (req,res)=>{
    res.sendFile(path.join(__dirname, 'contact-me.html'))
})
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});
app.listen(PORT, (error)=>{
    if(error) {throw error;}
    console.log(`Server running on port ${PORT}`)
})