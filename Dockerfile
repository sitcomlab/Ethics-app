# Ethics-app runtime image
#
# Uses the official Node.js Docker image (26.3.1 on Debian Bookworm). System
# packages for Puppeteer/Chromium PDF export and bower are installed on top.
FROM node:26.3.1-bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive \
    PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# System dependencies:
# - chromium + libs: required by Puppeteer to render the PDF documents
# - git: required by bower to fetch the frontend libraries
# - ca-certificates: TLS (also referenced by SMTP_CA_FILE in .env)
# - fonts: correct text rendering inside the generated PDFs
RUN apt-get update && apt-get install -y --no-install-recommends \
        ca-certificates git \
        chromium \
        fonts-liberation fonts-dejavu-core fonts-noto-color-emoji \
        libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 \
        libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2 \
        libpango-1.0-0 libcairo2 \
        libatomic1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies first to leverage Docker layer caching.
# devDependencies (bower) are required for the frontend build step below.
COPY package.json ./
RUN npm install --no-audit --no-fund

# Copy the application source.
COPY . .

# Install the AngularJS frontend libraries into public/bower_components.
RUN npm run bower

EXPOSE 5000

CMD ["node", "server.js"]
