#!/bin/bash
DATE=$(date +"%Y-%m-%d")
mongodump --out "/home/good/backups/$DATE"