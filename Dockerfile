# Stage 1 build the app with node
FROM node:10 as build-stage
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci
COPY . /app
RUN echo $(date +%s) > /app/_tstamp
RUN bash fix-src.sh
RUN npm run build

# Stage 2, based on Nginx, to have only the compiled app,
FROM nginx:1.17.3-alpine
ARG GIT_COMMIT=n/a
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/_tstamp /usr/share/nginx/html/_tstamp

# Copy our nginx.conf to image
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN echo $GIT_COMMIT > /usr/share/nginx/html/git_sha.txt
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./startup.sh .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x startup.sh

HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget localhost:80/ -q -O - > /dev/null 2>&1
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/startup.sh"]
