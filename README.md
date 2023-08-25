# Full-stack Developer Code Test by Pandora Technology.

Backend is created with NodeJS, TypeScript.
For database, I used `prisma` and `SqLite3`.
If your machine is installed `SqLite3`, running the backend will be fine.
But if you want to use `MySQL`, only change the url of the data source on `backend/prisma/schema.prisma` to your MySQL url will work.

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

Pagination is implemented at the api level. You can check in `backend/src/router/posts.router.ts`.

Front-end is scaffolded with `vite` and `typescript`.

To run the project, I used `pnpm`, but `npm` or `yarn` may also work well.


To start backend, run `pnpm run start` on the backend directory.
To start the frontend, run `pnpm run build && pnpm run preview` on the frontend directory.

---
## Development Environment
- Ubuntu 22.04.3 LTS x86_64
- Node version 18.16.0
- pnpm version 8.6.2
- sqlite3 version 
