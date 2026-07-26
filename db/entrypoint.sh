#!/bin/bash
# Chạy restore script ở background, sau đó start SQL Server
/db/restore.sh &

# Start SQL Server (foreground)
exec /opt/mssql/bin/sqlservr
