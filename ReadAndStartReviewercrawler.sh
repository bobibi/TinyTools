#!/bin/bash

echo $1

cat $1 | while read line
do
curl http://localhost:6800/schedule.json -d project=my_amazon_crawler -d spider=reviewer -d uid=$line
done
