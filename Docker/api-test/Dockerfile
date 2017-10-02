FROM node:6.9.5

ENV API_ROOT /usr/src/app

RUN mkdir -p ${API_ROOT} 
WORKDIR ${API_ROOT}

COPY ./package.json ${API_ROOT}
RUN npm install
COPY . ${API_ROOT}

CMD ["node", "index.js"]
