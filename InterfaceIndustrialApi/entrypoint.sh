#!/bin/bash
set -e

echo "Applying Entity Framework Core migrations..."
dotnet ef database update --context AppDbContext 2>&1 || true

echo "Starting application..."
exec dotnet UserCrudApi.dll
