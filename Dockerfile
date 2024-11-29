FROM node:14.16 AS build
WORKDIR /usr/src/renewalvault
COPY package*.json ./

#RUN npm install -g @angular/cli
#RUN npm install sass
#RUN npm install
COPY . .
#RUN npm run build 

### STAGE 2: Run ###
FROM nginx:1.21.4-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/renewalvault/dist/ /usr/share/nginx/html