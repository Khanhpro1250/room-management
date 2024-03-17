# Hệ thống quản lý phòng trọ

- ## Hướng dẫn run Backend

  > B1: Mở source back-end

  ```
  Mở SQL server => tạo database => restore database file 'qlpt.bak'
  Mở file appsettings.json
  Sửa DefaultConnection cho phù hợp với server sql của máy
  ```

  > B2: Tại folder source mở terminal

  ```
  cd E:\source\room-management\backend\backend
  ```

  ```
  PS E:\source\room-management\backend\backend> dotnet watch run
  ```

- ## Hướng dẫn run Font-end
  > B1: Tại folder source mở terminal
  ```
  cd E:\source\room-management\frontend
  ```
  ```
  PS E:\source\room-management\frontend> yarn; yarn start
  ```
- ## Hướng dẫn run mobile
  > B1: Tại folder source mở terminal
  ```
  cd E:\source\room-management\mobile
  ```
  > Trường hợp không có máy áo => run trên web
  ```
  PS E:\source\room-management\mobile> yarn; yarn web
  ```
  > Trường hợp có máy ảo
  ```
  PS E:\source\room-management\mobile> yarn; yarn start
  ```

## Account hệ thống

> Admin:

```
username: admin
password: khanhpro1250
```

> User hệ thống:

```
username: khanh.huynh
password: khanhpro1250
```
