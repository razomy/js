FROM node:26-alpine

# Install git (release tools require git to read/write tags and versioning)
RUN apk add --no-cache git

WORKDIR /workspace

# Configure npm registry authentication to read from NODE_AUTH_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=\${NODE_AUTH_TOKEN}" > ~/.npmrc

# Copy package definitions first for layer caching
COPY package*.json ./

# Copy the rest of the repository (including .git if your release tool creates tags)
COPY . .

RUN npm i --legacy-peer-deps && npm i && npm run build && npm run release

# Build and execute the release
ENTRYPOINT ["sh", "-c", "npm run release -- production"]
