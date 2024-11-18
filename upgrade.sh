#!/usr/bin/env sh
echo "Upgrading packages..."
cd base && ncu -u && cd ..
cd account && ncu -u && cd ..
echo "\nDone."
