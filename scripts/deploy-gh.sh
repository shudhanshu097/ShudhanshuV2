#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

GH="${GH_BIN:-$(command -v gh || echo "$HOME/.local/bin/gh")}"
REPO="https://github.com/shudhanshu097/ShudhanshuV2.git"

npm run build:gh

STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

cp -R out/. "$STAGE/"
touch "$STAGE/.nojekyll"
rm -f "$STAGE/.gitignore"

cd "$STAGE"
git init -q
git checkout -q -b gh-pages
git add -A
git -c user.name="Shudhanshu Jaiswal" -c user.email="shudhanshuj097@gmail.com" \
  commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"

GIT_CONFIG_COUNT=3 \
GIT_CONFIG_KEY_0=credential.helper \
GIT_CONFIG_VALUE_0="!${GH} auth git-credential" \
GIT_CONFIG_KEY_1=http.postBuffer \
GIT_CONFIG_VALUE_1=157286400 \
GIT_CONFIG_KEY_2=http.version \
GIT_CONFIG_VALUE_2=HTTP/1.1 \
git push -f "$REPO" gh-pages

"${GH}" api -X POST "repos/shudhanshu097/ShudhanshuV2/pages/builds" >/dev/null || true

echo "Published to https://shudhanshu097.github.io/ShudhanshuV2/"
