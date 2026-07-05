#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

GH="${GH_BIN:-$(command -v gh || echo "$HOME/.local/bin/gh")}"

rm -rf node_modules/.cache/gh-pages

GIT_CONFIG_COUNT=3 \
GIT_CONFIG_KEY_0=credential.helper \
GIT_CONFIG_VALUE_0="!${GH} auth git-credential" \
GIT_CONFIG_KEY_1=http.postBuffer \
GIT_CONFIG_VALUE_1=157286400 \
GIT_CONFIG_KEY_2=http.version \
GIT_CONFIG_VALUE_2=HTTP/1.1 \
npx gh-pages -d out --dotfiles -r https://github.com/shudhanshu097/ShudhanshuV2.git

echo "Published to https://shudhanshu097.github.io/ShudhanshuV2/"
