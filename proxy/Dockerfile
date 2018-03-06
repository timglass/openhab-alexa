FROM foertel/rpi-alpine-nginx
#FROM nginx:alpine

RUN rm -rf /etc/nginx
COPY ./conf /etc/nginx
COPY ./index.html /data/www/index.html
EXPOSE 80 443