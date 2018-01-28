import http from 'http';
import express from 'express';

let PORT = 8080;
var config = { port: null };

let app = express();
app.server = http.createServer(app);

app.get('/', (request, response) => {
    response.send('Hello from Express!')
})

app.server.listen(process.env.PORT || config.port || PORT, () => {
    console.log(`Started on port ${app.server.address().port}`);
});
    

export default app;