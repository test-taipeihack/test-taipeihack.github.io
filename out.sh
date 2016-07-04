# check out of space by modifying web site
PERSON=$1
shift
git pull
node check.js out $PERSON
exit

#git diff
git commit -am 'checkout'
git push
