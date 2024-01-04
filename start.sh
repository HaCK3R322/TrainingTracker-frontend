#!/bin/bash

# ANSI escape codes for text colors
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m'  # No Color

# Function to create log folders
function createLogFolders {
    mkdir -p logs/eureka
    mkdir -p logs/tracking-service
    mkdir -p logs/authentication-service
    mkdir -p logs/api-gateway
    mkdir -p logs/serve
}

# Function to display progress bar
function progressBar {
    local duration=$1
    local interval=$2
    local total_blocks=$3

    printf "${YELLOW}[TRAINING-TRACKER STARTER]${NC} "

    for ((i = 1; i <= duration; i++)); do
        printf "\r["

        for ((j = 1; j < i; j++)) do
            printf "="
        done

        for ((j = i; j < total_blocks; j++)) do
            printf " "
        done

        printf "] $i/$duration"
        sleep $interval
    done

    printf "\n"
}

# Function to start service in a tmux session
function startJavaService {
    local session_name=$1
    local jar_file=$2
    local log_folder=$3
    local log_file="${session_name}-$(date +'%Y-%m-%d_%H-%M-%S').log"

    printf "${NC}[TRAINING-TRACKER STARTER]${NC} starting ${RED}[$session_name]${NC}\n"
    tmux new-session -d -s $session_name "java -jar $jar_file >> logs/$log_folder/$log_file"
}

function startServe {
    local session_name=$1
    local serve_command=$2
    local log_folder=$3
    local log_file="${session_name}-$(date +'%Y-%m-%d_%H-%M-%S').log"

    printf "${NC}[TRAINING-TRACKER STARTER]${NC} starting ${RED}[$session_name]${NC}\n"
    tmux new-session -d -s $session_name "${serve_command} >> logs/$log_folder/$log_file"
}

# Flags to determine which services to start
nofront=false
noeureka=false
nogateway=false
notracking=false
noauth=false

# Parse command line options
while [[ $# -gt 0 ]]; do
    case "$1" in
        --nofront)
            nofront=true
            shift
            ;;
        --noeureka)
            noeureka=true
            shift
            ;;
        --nogateway)
            nogateway=true
            shift
            ;;
        --notracking)
            notracking=true
            shift
            ;;
        --noauth)
            noauth=true
            shift
            ;;
        *)
            shift
            ;;
    esac
done

printf "${YELLOW}[TRAINING-TRACKER STARTER]${NC} Creating log folders if needed\n"
createLogFolders

# Check for -nofront argument
if [ "$nofront" == true ]; then
    printf "${YELLOW}[TRAINING-TRACKER STARTER]${NC} Skipping front-end (serve) startup.\n"
else
    # Start serve from front/build
    startServe "serve-session" "serve -s front/build" "serve"
fi

# Check for -noeureka argument
if [ "$noeureka" == true ]; then
    printf "${YELLOW}[TRAINING-TRACKER STARTER]${NC} Skipping Eureka startup.\n"
else
    startJavaService "eureka-session" "eureka.jar" "eureka"
fi

# Check for -notracking argument
if [ "$notracking" == true ]; then
    printf "${YELLOW}[TRAINING-TRACKER STARTER]${NC} Skipping tracking-service startup.\n"
else
    # Start tracking-service
    startJavaService "tracking-service-session" "tracking-service.jar" "tracking-service"
fi

# Check for -noauth argument
if [ "$noauth" == true ]; then
    printf "${YELLOW}[TRAINING-TRACKER STARTER]${NC} Skipping authentication-service startup.\n"
else
    # Start authentication-service
    startJavaService "authentication-service-session" "authentication-service.jar" "authentication-service"
fi

# Check for -nogateway argument
if [ "$nogateway" == true ]; then
    printf "${YELLOW}[TRAINING-TRACKER STARTER]${NC} Skipping api-gateway startup.\n"
else
    # Start api-gateway
    startJavaService "api-gateway-session" "api-gateway.jar" "api-gateway"
fi

printf "${YELLOW}[TRAINING-TRACKER STARTER]${NC} START DONE\n"
