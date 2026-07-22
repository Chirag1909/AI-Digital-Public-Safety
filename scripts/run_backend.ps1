  param(
    [int]$Port = 8000
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

. .\.venv\Scripts\Activate.ps1
Set-Location backend
uvicorn app:app --reload --host 0.0.0.0 --port $Port
