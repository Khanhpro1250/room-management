FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0.401-alpine3.16-amd64 AS build

WORKDIR /src
ENV TZ=Asia/Ho_Chi_Minh
COPY ["backend", "backend"]
RUN dotnet restore backend/backend.csproj

WORKDIR /src
RUN dotnet build "backend/backend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "backend/backend.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "backend.dll"]
