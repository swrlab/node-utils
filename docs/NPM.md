# SWR Audio Lab on NPM

This is a quick guide and some notes about SWR Audio Lab packages on [NPMjs.com](https://www.npmjs.com/).

- [SWR Audio Lab on NPM](#swr-audio-lab-on-npm)
  - [Security](#security)
  - [Publishing](#publishing)

## Security

Two-factor authentication (2FA) is enabled for all of SWR Audio Lab's packages (published as `@swrlab`).  
To set up 2FA for your account, visit this guide: [docs.npmjs.com/configuring-two-factor-authentication](https://docs.npmjs.com/configuring-two-factor-authentication).

## Publishing

First, make sure you are logged into the `npm` CLI locally (`npm config list). If not, use the web authentication workflow:

```sh
npm login --auth-type web
```

Now go to the folder locally:

```sh
cd /path/to/my/repo
```

Make sure it is up-to-date and the version you plan on publishing. You can also check the config with:

```sh
npm publish --dry-run
```

Once everything is ready, hit publish:

```sh
npm publish --access public
```

It will ask for a one-time password (OTP), enter it into the CLI and hit Enter.
