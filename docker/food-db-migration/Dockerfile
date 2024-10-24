FROM node:22.10.0-alpine
WORKDIR /app

COPY apps/food/prisma ./prisma/

CMD [ "npx", "prisma", "migrate", "deploy" ]
