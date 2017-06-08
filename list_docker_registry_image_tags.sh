images="$(curl -s ${REGISTRY}/v2/_catalog | jq '.repositories | join(" ")')"
for image in $images; do
    echo "${image}"
    curl -s "${REGISTRY}/v2/${image}/tags/list" | jq
done