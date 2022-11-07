# Vue.js & Storyblok

## Project setup
```bash
npm install # Install Node dependencies

# Storyblok bridge requires https, so we will need to generate TLS certs for local use
# Install mkcert for creating a valid certificate (Mac OS):
brew install mkcert
mkcert -install # Install local CA
# Create directory for certificates (run in the project root dir!)
mkdir devserver
cd devserver
# Generate TLS cert for localhost and loopback
mkcert localhost 127.0.0.1 -cert-file localhost.pem -key-file localhost-key.pem
export LOCAL_HTTPS=true # required for local https server in Vue config
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
