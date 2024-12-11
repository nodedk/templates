#!/usr/bin/env sh
echo "Upgrading packages..."
cd basic && ncu -u && cd ..
cd account && ncu -u && cd ..
echo "\nDone."
