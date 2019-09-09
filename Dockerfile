FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
ARG NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc
COPY package*.json ./
RUN npm install
RUN rm -f .npmrc

# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .
CMD [ "npm", "start" ]
