FROM tutum/nginx
RUN rm /etc/nginx/sites-enabled/default
ADD sites-enabled/ /etc/nginx/sites-enabled
RUN mkdir -p /usr/src/app/admin
ADD build/ /usr/src/app/admin
