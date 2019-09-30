#!/bin/bash

# we fix source code by changing all process.env. by window._env_.
for file in `grep -lR 'process\.env\.' src`;
  do echo $file
  sed -i -e 's/process.env./window._env_./g' $file
done

# insert include in index.html
echo 'public/index.html'
sed -i -e 's#</head>#<script src="%PUBLIC_URL%/env-config.js"></script></head>#' public/index.html

# remove backup files
find src -name '*.bak'  -exec rm -rf {} \;
find public -name '*.bak'  -exec rm -rf {} \;
