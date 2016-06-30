# check in to space by modifying web site
# can add info about what you are doing or how long as argument, example:
#   ./in.sh 'working on web stuff from 12 to 5'
git pull
node check.js in "$*"
#git diff
git commit -am "checkin $*"
git push
