files=$(find . -type f -name "*.jsx.js")

for f in $files; do 
    #echo "$f"
    mv -- "$f" "${f%.jsx.js}.js"
done
echo "after rename"
find . -type f -name "*.jsx.js"
