# Stage 1 build the app with node
FROM node:10 as build-stage
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
COPY . /app
COPY build_env /app/.env
RUN npm run build

# Stage 2, based on Nginx, to have only the compiled app,
FROM nginx:1.16.0-alpine
COPY --from=build-stage /app/build/ /usr/share/nginx/html

# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

