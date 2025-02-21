FROM node:18
RUN mkdir -p /var/www/jobs-service
WORKDIR /var/www/jobs-service
ADD . /var/www/jobs-service
RUN npm install
CMD npm run build && npm run start:prod