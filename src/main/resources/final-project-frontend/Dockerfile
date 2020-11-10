# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3000

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . .

# start app
CMD ["npm", "start"]
#ENTRYPOINT ["/usr/bin/npm", "App.js"]
# The Node version that we'll be running for our version of React.
# You may have to search the Node directory for a version that fits
# the version of React you're using.
