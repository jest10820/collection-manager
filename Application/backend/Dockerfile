FROM node:8.1.2

# Install supervisord
RUN apt-get update && \
    apt-get install -y supervisor

ENV API_ROOT /usr/src/app

# Create API folders
RUN mkdir -p ${API_ROOT}
WORKDIR ${API_ROOT}
# Install nodejs dependencies
COPY app/package.json ${API_ROOT}
RUN npm install
# Copy application
COPY app/ ${API_ROOT}
# Copy supervisord configuration
COPY ./supervisord/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
