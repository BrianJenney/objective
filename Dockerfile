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
FROM nginx:1.17.3-alpine
ARG GIT_COMMIT=n/a
COPY --from=build-stage /app/build/ /usr/share/nginx/html

# Copy our nginx.conf to image
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN echo $GIT_COMMIT > /usr/share/nginx/html/git_sha
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget localhost:80/ -q -O - > /dev/null 2>&1
CMD ["nginx", "-g", "daemon off;"]

