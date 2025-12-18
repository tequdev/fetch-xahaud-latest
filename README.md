### Latest release binary

```txt
https://binary.xahau.tools/
```

### Latest dev branch binary

```txt
https://binary.xahau.tools/release/dev
```

### Latest HEAD binary

```txt
https://binary.xahau.tools/release/HEAD
```

### Binary list

```txt
https://binary.xahau.tools/releases/release
```
```txt
https://binary.xahau.tools/releases/dev
```
```txt
https://binary.xahau.tools/releases/HEAD
```

### Development

```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
