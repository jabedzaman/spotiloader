#!/bin/bash

#  check if version is same in package.json and app.config.js and app.json

cd ..
packageversion=$( cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
cd config
configversion=$( cat app.config.js| grep version | head -1 | awk -F\" '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
cd ..
appversion=$( cat app.json | grep version | head -1 | awk -F\" '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
if [ "$packageversion" != "$configversion" ] || [ "$packageversion" != "$appversion" ]; then
    echo "version in package.json and app.config.js and app.json is not same"
    echo "please make sure version in package.json and app.config.js and app.json is same"
    exit 0
fi
#  check if version is satisfied

echo "Are you sure you want to build version $appversion (n/Y)?"
read build
if [ "$build" == "n" ] || [ "$build" == "N" ] || [ "$build" == "no" ] || [ "$build" == "No" ] || [ "$build" == "NO" ]; then
    echo "build cancelled"
    exit 0
fi

#  check if api is setup or not

cd config
if [ ! -f "apikey.config.js" ]; then
    echo "api.config.js is not found"
    echo "please setup api.config.js"
    exit 0
fi
cd ..

#  remove api key from .gitignore
echo "removing apikey.config.js from .gitignore"
sleep 1
sed -i '/apikey.config.js/d' .gitignore


# create build script

echo "creating build script"
echo "{" >> eas.json
echo "  \"build\": {" >> eas.json
echo "    \"preview\": {" >> eas.json
echo "      \"android\": {" >> eas.json
echo "        \"buildType\": \"apk\"" >> eas.json
echo "      }" >> eas.json
echo "    }," >> eas.json
echo "    \"preview2\": {" >> eas.json
echo "      \"android\": {" >> eas.json
echo "        \"gradleCommand\": \":app:assembleRelease\"" >> eas.json
echo "      }" >> eas.json
echo "    }," >> eas.json
echo "    \"preview3\": {" >> eas.json
echo "      \"developmentClient\": true" >> eas.json
echo "    }," >> eas.json
echo "    \"production\": {}" >> eas.json
echo "  }" >> eas.json
echo "}" >> eas.json
echo "Build script created"

#  start building

echo "starting build"
sleep 3
clear
eas build -p android --profile preview


#  add api key again to .gitignore

echo "/config/apikey.config.js" >> .gitignore
rm eas.json