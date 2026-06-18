# Ethics-app runtime image
#
# Pinned to the exact requested Node.js version (26.3.1). The official Docker Hub
# "node" image does not (yet) publish a 26.3.1 tag, so Node is installed from the
# official nodejs.org tarball on top of Debian Bookworm. This also gives us full
# control over the system libraries that Puppeteer/Chromium needs for PDF export.
FROM debian:bookworm-slim

ENV NODE_VERSION=26.3.1 \
    DEBIAN_FRONTEND=noninteractive \
    PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# System dependencies:
# - chromium + libs: required by Puppeteer to render the PDF documents
# - git: required by bower to fetch the frontend libraries
# - ca-certificates: TLS (also referenced by SMTP_CA_FILE in .env)
# - fonts: correct text rendering inside the generated PDFs
RUN apt-get update && apt-get install -y --no-install-recommends \
        ca-certificates curl xz-utils git \
        chromium \
        fonts-liberation fonts-dejavu-core fonts-noto-color-emoji \
        libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 \
        libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2 \
        libpango-1.0-0 libcairo2 \
        libatomic1 \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js (pinned to ${NODE_VERSION})
RUN ARCH="$(dpkg --print-architecture)" \
    && case "$ARCH" in \
         amd64) NODE_ARCH="x64";; \
         arm64) NODE_ARCH="arm64";; \
         *) echo "Unsupported architecture: $ARCH" && exit 1;; \
       esac \
    && curl -fsSLO "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-${NODE_ARCH}.tar.xz" \
    && tar -xJf "node-v${NODE_VERSION}-linux-${NODE_ARCH}.tar.xz" -C /usr/local --strip-components=1 \
    && rm "node-v${NODE_VERSION}-linux-${NODE_ARCH}.tar.xz" \
    && node --version && npm --version

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
