#!/bin/bash
cd /home/kavia/workspace/code-generation/splitsmart-expense-manager-85440-85450/splitsmart_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

