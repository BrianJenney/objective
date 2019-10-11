#!/bin/bash

# we fix source code by changing all process.env. by window._env_.
for file in `grep -lR 'process\.env\.' src`;
  do echo $file
  sed -i -e 's/process.env./window._env_./g' $file
done
sed -i -e 's/"%\(REACT_APP_[A-Z0-9_]*\)%"/window._env_.\1/g' public/index.html

# insert include in index.html
echo 'public/index.html'
sed -i -e "s#<head>#<head><script src=\"%PUBLIC_URL%/env-config-$(cat _tstamp).js\"></script>#" public/index.html

# remove backup files
find src -name '*.bak'  -exec rm -rf {} \;
find public -name '*.bak'  -exec rm -rf {} \;
