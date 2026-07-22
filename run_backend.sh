#!/bin/bash

source venv/bin/activate
cd backend

pip install -r requirements.txt

uvicorn app:app --reload