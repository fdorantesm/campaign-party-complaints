#!/bin/bash

# rm -rf /home/node/app/node_modules
# cp -r /home/node/modules/node_modules /home/node/app
rm -rf /home/node/app/node_modules 
cp -r /home/node_modules/* node_modules/
chown node:node -R /home/node/app/node_modules
rm -rf /home/node_modules
