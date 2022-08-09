# Super Linter for SWR Audio Lab

To simplify linting, this repository contains a template, that can be used by all SWR Audio Lab projects.

- [Super Linter for SWR Audio Lab](#super-linter-for-swr-audio-lab)
  - [Super Linter](#super-linter)
  - [Usage](#usage)
  - [Configuration](#configuration)

## Super Linter

The used linter of choice here is `super-linter`, which bundles a lot of different projects. Some that are really not needed are disabled in the config.

Super Linter: [github.com/github/super-linter](https://github.com/github/super-linter)

## Usage

Simply create a file `.github/workflows/linter.yml`:

```yaml
name: Linter

on:
  workflow_dispatch:
  pull_request:

jobs:
  lint:
    uses: swrlab/node-utils/.github/workflows/linter.yml
    with:
      install-all: true
      generate-keys: true
```

This uses the re-usable GitHub Actions workflow and calls the template from `node-utils` using the provided input variables:

- `install-all` - If `true` it will use `yarn install:all` instead of `yarn install` to trigger a custom script.
  This is useful, if the repository has multiple sub-folders that all need to be installed
- `generate-keys` - If `true` will call `yarn keys:generate` to run a custom script for dummy key creation.
- `log-level` - One of the follorwing: `ERROR`, `WARN`, `NOTICE`, `VERBOSE`, `DEBUG` or `TRACE`; defaults to `VERBOSE`.

## Configuration

To prevent copying configuration files to every repository, all `super-linter` options are included in this one ([`.github/linters`](./../.github/linters/)) and get cloned into every run.
