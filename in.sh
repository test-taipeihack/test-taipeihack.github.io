# check in to space by modifying web site
#   ./in.sh
# can optionally add info about who you are
#   ./in.sh Kai
# and what you are doing, and/or how long:
#   ./in.sh Kai 'working on web stuff from 12 to 5'
PERSON=$1
shift
git pull
node check.js in $PERSON "$*"
#git diff
git commit -am "checkin $PERSON $*"
git push
