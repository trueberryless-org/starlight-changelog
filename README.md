# Starlight Changelog

View all releases of the [`@astrojs/starlight`](https://github.com/withastro/starlight) package on this beautiful website: [starlight-changelog.netlify.app](https://starlight-changelog.netlify.app)

Releases of every other package published from the Starlight repository, like the Tailwind and DocSearch integrations, are available on their own [package pages](https://starlight-changelog.netlify.app/packages/). All release notes can be searched with the full-text search powered by [Pagefind](https://pagefind.app).

[![Netlify Status](https://api.netlify.com/api/v1/badges/a9e6e0c5-1a9b-4c22-8544-7c75e6925d8e/deploy-status)](https://app.netlify.com/projects/starlight-changelog/deploys)

## Development

Releases are loaded from the GitHub API at build time. Set a `GITHUB_TOKEN` environment variable to load the complete release history, as unauthenticated requests are limited to the latest 1000 releases of the `withastro/starlight` repository.

```sh
pnpm install
pnpm dev
```

The search index is generated at build time, so search is only available after running `pnpm build` and `pnpm preview`.

## License

Licensed under the MIT License, Copyright © trueberryless.

See [LICENSE](https://github.com/trueberryless-org/starlight-changelog/blob/main/LICENSE) for more information.
