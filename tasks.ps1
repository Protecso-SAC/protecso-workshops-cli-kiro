<#
.SYNOPSIS
  Equivalente en PowerShell del Makefile, para Windows sin WSL.

.DESCRIPTION
  Cada tarea hace lo mismo que su target de make. En la máquina solo se asume
  git y Docker Desktop; Node corre dentro del contenedor.

.EXAMPLE
  .\tasks.ps1 test
  .\tasks.ps1 run list
  .\tasks.ps1 run lend 9780000000011 S001
#>
param(
  [Parameter(Position = 0)]
  [string]$Task = "help",

  [Parameter(Position = 1, ValueFromRemainingArguments = $true)]
  [string[]]$Rest
)

$Image = "biblioteca-practica"
$Root = $PSScriptRoot
Set-Location $Root

function Show-Help {
  Write-Host "Uso: .\tasks.ps1 <tarea> [argumentos]"
  Write-Host ""
  Write-Host "  help        Lista las tareas disponibles"
  Write-Host "  docker-up   Verifica que Docker responda (abre Docker Desktop si hace falta)"
  Write-Host "  build       Construye la imagen de práctica"
  Write-Host "  test        Corre las pruebas dentro del contenedor"
  Write-Host "  run         Ejecuta la CLI: .\tasks.ps1 run list"
  Write-Host "  shell       Abre una terminal dentro del contenedor"
}

function Test-Docker {
  docker info *> $null
  return ($LASTEXITCODE -eq 0)
}

# Equivale a bin/ensure-docker.sh: idempotente y con mensajes claros.
function Assert-DockerReady {
  if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "✗ Docker no está instalado." -ForegroundColor Red
    Write-Host "  Instala Docker Desktop (https://www.docker.com/products/docker-desktop/) y vuelve a intentar."
    exit 1
  }

  if (Test-Docker) { return }

  Write-Host "→ El daemon de Docker no responde. Intentando abrir Docker Desktop…"
  $desktop = $null
  if ($Env:ProgramFiles) {
    $desktop = Join-Path $Env:ProgramFiles "Docker\Docker\Docker Desktop.exe"
  }
  if (-not $desktop -or -not (Test-Path $desktop)) {
    Write-Host "✗ No encuentro Docker Desktop." -ForegroundColor Red
    Write-Host "  Inícialo a mano, espera a que diga que está corriendo y vuelve a intentar."
    exit 1
  }
  Start-Process $desktop

  for ($i = 0; $i -lt 60; $i++) {
    Start-Sleep -Seconds 2
    if (Test-Docker) {
      Write-Host "✓ Docker listo."
      return
    }
  }

  Write-Host "✗ El daemon de Docker no respondió tras 120 s. Revisa Docker Desktop." -ForegroundColor Red
  exit 1
}

function Build-Image {
  Assert-DockerReady
  docker build -t $Image .
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

switch ($Task) {
  "help" { Show-Help }
  "docker-up" { Assert-DockerReady }
  "build" { Build-Image }
  "test" {
    Build-Image
    docker run --rm -v "${Root}:/app" -w /app $Image npm test
    exit $LASTEXITCODE
  }
  "run" {
    Build-Image
    docker run --rm -v "${Root}:/app" -w /app $Image node src/index.js @Rest
    exit $LASTEXITCODE
  }
  "shell" {
    Build-Image
    docker run --rm -it -v "${Root}:/app" -w /app $Image bash
    exit $LASTEXITCODE
  }
  default {
    Write-Host "Tarea desconocida: $Task" -ForegroundColor Red
    Show-Help
    exit 1
  }
}
