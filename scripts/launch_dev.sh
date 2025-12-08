#!/bin/bash

# Script to launch database, backend, and frontend development servers for NCVIC Sunset
# Kills any existing processes on ports 8001 (backend) and 5173 (frontend) before starting

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to kill process on a port
kill_port() {
    local port=$1
    local pid=$(lsof -ti:$port 2>/dev/null || true)
    if [ -n "$pid" ]; then
        echo -e "${YELLOW}Killing process on port $port (PID: $pid)${NC}"
        kill -9 $pid 2>/dev/null || true
        sleep 1
    fi
}

# Kill existing processes
echo -e "${YELLOW}Checking for existing processes...${NC}"
kill_port 8001  # Backend port
kill_port 5173  # Frontend port

# Get the directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
FRONTEND_DIR="$(dirname "$SCRIPT_DIR")"
BACKEND_DIR="$(dirname "$FRONTEND_DIR")/ncvic-sunset-backend"

# Check if backend directory exists
if [ ! -d "$BACKEND_DIR" ]; then
    echo -e "${RED}Error: Backend directory not found at $BACKEND_DIR${NC}"
    exit 1
fi

# 1. Start PostgreSQL Database
echo -e "${BLUE}Starting PostgreSQL database...${NC}"
cd "$BACKEND_DIR"
docker-compose up -d
echo -e "${GREEN}✓ PostgreSQL started on port 5434${NC}"
sleep 3

# 2. Start backend
echo -e "${GREEN}Starting backend on port 8001...${NC}"
cd "$BACKEND_DIR"
uv run fastapi dev src/ncvic_sunset_backend/main.py --port 8001 > /tmp/ncvic-backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}Backend started (PID: $BACKEND_PID)${NC}"
echo -e "${YELLOW}Backend logs: tail -f /tmp/ncvic-backend.log${NC}"

# Wait a moment for backend to start
sleep 3

# 3. Start frontend
echo -e "${GREEN}Starting frontend on port 5173...${NC}"
cd "$FRONTEND_DIR"
npm run dev > /tmp/ncvic-frontend.log 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}Frontend started (PID: $FRONTEND_PID)${NC}"
echo -e "${YELLOW}Frontend logs: tail -f /tmp/ncvic-frontend.log${NC}"

# Wait a moment for frontend to start
sleep 2

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}NCVIC Sunset Development Environment${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "Database:  localhost:5434 (user: dbadmin, db: ncvic_sunset)"
echo -e "Backend:   http://localhost:8001"
echo -e "Frontend:  http://localhost:5173"
echo ""
echo -e "${YELLOW}Backend PID:  $BACKEND_PID${NC}"
echo -e "${YELLOW}Frontend PID: $FRONTEND_PID${NC}"
echo ""
echo -e "${YELLOW}To stop servers, run:${NC}"
echo -e "  kill $BACKEND_PID $FRONTEND_PID"
echo -e "  docker-compose -f $BACKEND_DIR/docker-compose.yml down"
echo ""
echo -e "${YELLOW}To view logs:${NC}"
echo -e "  Backend:  tail -f /tmp/ncvic-backend.log"
echo -e "  Frontend: tail -f /tmp/ncvic-frontend.log"
echo ""

# Wait for user interrupt
trap "echo -e '\n${YELLOW}Stopping servers...${NC}'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; cd $BACKEND_DIR && docker-compose down; exit" INT TERM

# Keep script running
wait



