#!/bin/bash
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
NC='\033[0m'
ASCII="""
${PURPLE}  _   _           _     _   _      _   
 | \ | | ___  ___| |_  | \ | | ___| |_ 
 |  \| |/ _ \/ __| __| |  \| |/ _ \ __|
 | |\  |  __/\__ \ |_  | |\  |  __/ |_ 
 |_| \_|\___||___/\__| |_| \_|\___|\__|${NC}
        ${CYAN}Cyberpunk DAG x NFT x Substrate${NC}
"""
echo -e "$ASCII"
docker-compose up --build