#!/bin/bash -e

SUBNET=$1

run_ssh() {
  ip=${SUBNET}.${1}
  sshpass -p abc123_ ssh -o ConnectTimeout=3 -o StrictHostKeyChecking=no user@${ip} \
    "ip=${ip}; gitUser=\$(git config --global user.name); echo \${ip} \${gitUser}" 2>/dev/null &
}

for i in $(seq 1 254); do
  run_ssh $i
done
wait
