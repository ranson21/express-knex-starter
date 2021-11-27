################################
# Stage 1 -- Build and Install #
################################
FROM alpine as installer
WORKDIR /home/app

# Copy Dependencies
COPY . .

# Run Install/Build
RUN apk --update add --no-cache nodejs nodejs-npm && npm i && npm run build

# Create the ENV variables
ENV HOST="0.0.0.0"
ENV PORT=4001

# Set the Entrypoint
ENTRYPOINT ["node", "/home/app/build/main.js" ]