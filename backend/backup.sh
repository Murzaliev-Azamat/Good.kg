#!/bin/bash
DATE=$(date +"%Y-%m-%d")
mongodump --out "/path/to/backup/$DATE"