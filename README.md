## Getting Started

### Requirements

- Node v20

### Required Environment Variables

- NEXT_PUBLIC_API_URL

### Instructions

First, install dependencies:

```bash
$ npm install
# or
$ yarn install
# or
$ pnpm install
```

Second, build the project:

```bash
$ npm run build
# or
$ yarn build
# or
$ pnpm build
```

Third, run the project:

```bash
$ npm start 
# or
$ yarn start
# or
$ pnpm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
Warning: Caching will not work on the development server.

## Getting Started with Docker

First, build the image using following command:

```bash
$ docker build \
  --build-arg NEXT_PUBLIC_API_URL="https://api.example.com" \
  -t nextjs-app:latest .
```

Second, run the container:

```bash
$ docker run --env-file .env -p 3000:3000 nextjs-app:latest
```

### Example .env file

```
NEXT_PUBLIC_API_URL=https://68c9962fceef5a150f6569ec.mockapi.io/api
```
