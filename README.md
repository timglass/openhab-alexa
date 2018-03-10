# Docker-Compose

docker-compose build

docker-compose up -d


# openhab-alexa
### Unit Tests
Run ```npm test``` 
\
Uses Mocha & Chai libraries to run unit tests

### Build
New - ```npm build```
\
Old - ```npx babel src/index.js --out-file dist/index.js```

### Test locally
```docker run -p 8888:8080 -d openhab-alexa```


### Deployment
Deployed as part of docker-compose scripts


# proxy
Based on https://miki725.github.io/docker/crypto/2017/01/29/docker+nginx+letsencrypt.html

sudo docker run -it --rm \
    -v /absolute/path/to/project/certs:/etc/letsencrypt \
    -v /absolute/path/to/project//certs-data:/data/letsencrypt \
    deliverous/certbot certonly --webroot --webroot-path=/data/letsencrypt \
    -d example.com -vvv