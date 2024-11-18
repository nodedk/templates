#!/usr/bin/env sh
echo "Removing node_modules and package-lock files..."
rm -rf base/node_modules && rm base/package-lock.json
rm -rf account/node_modules && rm account/package-lock.json
echo "\nDone."
