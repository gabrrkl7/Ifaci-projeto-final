# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

# Copy project files
COPY ["UserCrudApi.csproj", "./"]

# Restore dependencies
RUN dotnet restore "UserCrudApi.csproj"

# Copy source code
COPY . .

# Build the application
RUN dotnet build "UserCrudApi.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "UserCrudApi.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

# Copy published application
COPY --from=publish /app/publish .

# Expose port
EXPOSE 5071

# Set entry point
ENTRYPOINT ["dotnet", "UserCrudApi.dll"]
