
cd public/files/temp/

for i in 1 2 3 4 5 6 7
do
regex_pastdays="$regex_pastdays$(date -d @$(expr $(date +'%s') \- $(expr $i \* 86400))  +'|%Y-%m-%d')"
done
find . -type 'd' | ( grep -v -E $(date +'%Y-%m-%d')${regex_pastdays} | grep -E '[0-9]' ) |  xargs rm -rf
