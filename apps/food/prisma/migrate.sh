#!/bin/bash

# Run migrations
npx prisma migrate deploy

# Run the main container command
exec "$@"