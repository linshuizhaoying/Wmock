#! /bin/bash
rm -rf ./Front/build
sleep 1.5s
git reset --hard origin/master
git clean -f
git pull