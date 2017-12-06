#! /bin/bash
cd ./
echo 'server start'
kill -9 $(lsof -i:9966 |awk '{print $2}' | tail -n 2) 
yarn run start