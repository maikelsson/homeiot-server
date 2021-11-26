FROM node:12.18.1
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install
RUN npm build

COPY . .

EXPOSE 8080

ENV INFLUX_TOKEN=ceyrw6OfwvDVR2eX6aiCgL4XQ58ZzDtK7aXugLr2rsO3OrOkMpL_zO-ySC_ynP3G9HprzwQa3i6_YMFpXaZTHw==
ENV INFLUX_BUCKET=my-bucket
ENV INFLUX_URI=http://localhost:8086
ENV INFLUX_ORG=org
ENV PORT=3001

CMD [ "node", "dist/src/index.js" ]
USER node