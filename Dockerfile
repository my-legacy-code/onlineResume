FROM nginx
WORKDIR /usr/share/nginx/html
EXPOSE 80
COPY . .