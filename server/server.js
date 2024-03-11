const http =require('http');
const app = require('./app');
const port = process.env.PORT || 3001;


const server = http.createServer(app);

// server.use(cors({ origin: 'http://localhost:3000' }));

server.listen(port,()=>{
    console.log("app running",port);
});