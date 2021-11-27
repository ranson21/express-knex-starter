#!/bin/bash
readonly example_file=.env.example
readonly target_file=.env

answer=""

function ask() {
    local var="$1"
    local example="$2"
    local current="$3"

    local name=${var/$env_prefix/}

    if [ -n "$current" ]; then
        hint="current: $current"
    else
        hint="example: $example"
    fi

    answer=""

    while [ -z "$answer" ]; do
        echo -ne "\t$name [$hint]: "
        read -r answer </dev/tty

        if [ -z "$answer" ] && [ -n "$current" ]; then
            answer="$current"
            break
        fi
    done
}

echo "Enter your environment variables:"

new_content=""

while IFS= read -r line; do
    var=$(echo "$line" | cut -d= -f1)
    example=$(echo "$line" | cut -d= -f2)
    current="${!var}"

    ask "$var" "$example" "$current"

    new_content+="export $var=\"$answer\"\n"
done < <(cut -d' ' -f2 "$example_file")

echo
echo "Saving to $target_file:"
echo -en "$new_content" | tee "$target_file"

if [ -f "$target_file" ]; then
    source "$target_file"
fi

# Install node Modules if not intstalled
if [ ! -d node_modules ]; then
  npm i
fi
