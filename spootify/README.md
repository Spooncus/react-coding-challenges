1. Terminalde "docker build ./ -t spootify" komutu çalıştırılarak Docker Image oluşturulur.
2. ./spootify/.env dosyası içerisine kullanıcı client id'si ve kullanıcı secret key'i girilir.
3. Terminalde "docker run -p 80:80 --env-file ./.env spootify" komutu çalıştırılır.
4. http://0.0.0.0:80 URL'inden projeye ulaşabilirsiniz.
