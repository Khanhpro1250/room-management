# Stage 1: Install font cache and utilities
RUN fc-cache -f -v;

# Stage 2: Build the application
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ENV TZ=Asia/Ho_Chi_Minh
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj .
RUN dotnet restore

# Copy everything else and build
COPY . .
RUN dotnet publish -c Release -o out

# Stage 3: Deploy the application
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS deploy
WORKDIR /app
COPY --from=build /app/out .

# Expose the port the app will run on
EXPOSE 80

# Set the environment variable for ASP.NET Core
ENV ASPNETCORE_URLS=http://+:80

# Stage 4: Setup NGINX for serving the application
FROM nginx:alpine AS nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Stage 5: Create the final image by combining the deployment and NGINX
FROM deploy AS final
COPY --from=nginx /usr/sbin/nginx /usr/sbin/nginx
COPY --from=nginx /etc/nginx /etc/nginx

# Start NGINX and the application
CMD ["nginx", "-g", "daemon off;"]
