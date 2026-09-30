# @aws-rex/common-components

Shared header, footer, and navigation primitives for Aws Rex frontends.

- **Consumers:** `@aws-rex/dashboard`, `@aws-rex/marketing-site`
- **Repo:** `Rextasy-One/common-components`
- **Type:** presentational, dependency-free React 19 components (peer deps only)

## Install

Inside the workspace it is a normal dependency:

```jsonc
// src/<pod>/package.json
{
  "dependencies": {
    "@aws-rex/common-components": "workspace:*",
  },
}
```

The package is consumed **from source** — there is no build step. A Next.js consumer enables it
with:

```ts
// next.config.ts
transpilePackages: ['@aws-rex/common-components'];
```

Tailwind v4 ignores `node_modules`/symlinked workspace packages when it auto-detects sources, so a
consumer must also register the library explicitly:

```css
/* app/globals.css */
@import 'tailwindcss';
@source '../../../common-components/src';
```

## Usage

```tsx
import { Header, Footer } from '@aws-rex/common-components';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header brand="Aws Rex" />
      <main>{children}</main>
      <Footer owner="Aws Rex" />
    </>
  );
}
```

Subpath imports are available: `@aws-rex/common-components/header` and
`@aws-rex/common-components/footer`.

## API

### `<Header />`

| Prop      | Type                 | Default         | Description                         |
| --------- | -------------------- | --------------- | ----------------------------------- |
| `brand`   | `string`             | `'Aws Rex'`     | Brand name on the left.             |
| `items`   | `readonly NavItem[]` | Home, Dashboard | Primary navigation entries.         |
| `actions` | `ReactNode`          | —               | Right-hand slot (auth, theme, ...). |

`NavItem` is `{ label: string; href: string }`.

### `<Footer />`

| Prop    | Type     | Default      | Description      |
| ------- | -------- | ------------ | ---------------- |
| `owner` | `string` | `'Aws Rex'`  | Copyright owner. |
| `year`  | `number` | current year | Copyright year.  |

## Scripts

```bash
pnpm lint
pnpm typecheck
pnpm test          # Vitest + Testing Library (jsdom)
pnpm format
```

## Styling

Components carry Tailwind utility classes but ship no CSS. The consumer's Tailwind build is
responsible for generating the classes (see `@source` above).

## Tooling

ESLint, Prettier, and TypeScript config come from [`@aws-rex/config`](https://github.com/Rextasy-One/config),
a versioned dependency (`^1.0.0`) — this repo has no config that reaches outside itself:

```jsonc
{ "prettier": "@aws-rex/config/prettier", "devDependencies": { "@aws-rex/config": "^1.0.0" } }
```

## Roadmap

A standalone preview harness (so the library can be reviewed on GitHub on its own) is tracked in the
workspace [`docs/ROADMAP.md`](../../docs/ROADMAP.md).
