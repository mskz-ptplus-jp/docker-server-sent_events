# Use nginx image
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy client files to nginx html directory
COPY html /usr/share/nginx/html
