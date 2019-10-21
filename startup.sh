#!/bin/bash

# check if .env file is there, bail out id it does not
if [ ! -f .env ]; then
    echo ".env does not exist"
    exit 1;
fi

# Recreate config file
rm -rf ./env-config-*.js
ENV_JS=env-config-$(cat _tstamp).js
touch ${ENV_JS}

# Add assignment
echo "window._env_ = {" >> ${ENV_JS}

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}

  # Append configuration property to JS file
  echo "  $varname: \"${value//[$'\r\n']}\"," >> ${ENV_JS}
done < .env

echo "}" >> ${ENV_JS}

# Start program
exec nginx -g "daemon off;"
