# ---- Build stage ----
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
ENV TZ=Asia/Ho_Chi_Minh

ARG DOTNET_HTTP_PROXY=http://rb-proxy-apac.bosch.com:8080
ARG DOTNET_HTTPS_PROXY=http://rb-proxy-apac.bosch.com:8080

COPY backend.csproj .
RUN HTTP_PROXY=${DOTNET_HTTP_PROXY} HTTPS_PROXY=${DOTNET_HTTPS_PROXY} dotnet restore backend.csproj

COPY . .
RUN dotnet build backend.csproj -c Release -o /app/build

# ---- Publish stage ----
FROM build AS publish
RUN dotnet publish backend.csproj -c Release -o /app/publish /p:UseAppHost=false

# ---- Runtime stage ----
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app

ENV TZ=Asia/Ho_Chi_Minh
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "backend.dll"]