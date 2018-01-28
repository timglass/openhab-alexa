# openhab-alexa

Based on https://miki725.github.io/docker/crypto/2017/01/29/docker+nginx+letsencrypt.html

sudo docker run -it --rm \
    -v /absolute/path/to/project/certs:/etc/letsencrypt \
    -v /absolute/path/to/project//certs-data:/data/letsencrypt \
    deliverous/certbot certonly --webroot --webroot-path=/data/letsencrypt \
    -d example.com -vvv