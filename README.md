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
Build images using docker-compose scripts (running in detached mode)\
```docker-compose build && docker-compose up -d```

Then push the built images to a repository\
```docker-compose push```  
  
  
# proxy
Based on https://miki725.github.io/docker/crypto/2017/01/29/docker+nginx+letsencrypt.html

```sudo docker run -it --rm```\
```-v /absolute/path/to/project/certs:/etc/letsencrypt ```\
```-v /absolute/path/to/project//certs-data:/data/letsencrypt ```\
```deliverous/certbot certonly --webroot```\
```--webroot-path=/data/letsencrypt ```\
```-d example.com -vvv```


# Useful docker commands
When a container is up and running, sometimes you need to connect to it and run a command using the shell\
```docker exec -it nginx-proxy /bin/sh```

If containers are having issues communicating to each other then it may be worth checking that they can reach each other\
```docker network inspect nginx-network```

You can manually create a docker network by running the following
1) ```docker run -it -v /home/openhabian/docker/certs:/etc/letsencrypt -v /home/openhabian/docker/certs-data:/data/letsencrypt -p 80:80 -p 443:443 --name=nginx-proxy privateregistry/nginx-proxy```

2) ```docker network connect nginx-network nginx-proxy```

3) ```docker start nginx-proxy```