#! /bin/bash
##########################
# run
# $ source install.sh
# or
# $ . install.sh
##########################
echo "What is project name?"
read NAME
echo "Installing $NAME ..."

rm -rf $NAME
git clone git@github.com:smikodanic/supermean-api-ts.git $NAME
cd $NAME
rm -rf .git
git init
npm install
echo
echo "INSTALLATION COMPLETED SUCCESSFULY !"
sleep 2.1
