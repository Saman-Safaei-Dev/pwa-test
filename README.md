## Getting Started

### Requirements

- Node v20

---

First, install dependencies:

```bash
$ npm install
# or
$ yarn install
# or
$ pnpm install
```

```

```

Second, run the development server:

```bash
$ npm run dev
# or
$ yarn dev
# or
$ pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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
```
```
```
```
```
```
