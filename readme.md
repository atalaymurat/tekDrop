be sure docker and docker-compose installed to your system

- this app is a MERN stack mongodb database, express server, create-react client

**to start app** `</br>`
docker-compose up  `</br>`
it will be start on PORTs specified if you do not change the port

docker-compose  up --build `</br>`
for recreate images

- connect to mongodb from local with URI
- mongodb://localhost:27017/app_db

do npm i  //ın react and server

docker compose node modullerı root olarak atıyor hata veriyor:w

http://localhost:3005 -- frontend

http://localhost:3001 --api

Get Data From Database

sudo apt-get install gnupg

Issue the following command to import the
MongoDB public GPG Key from

curl -fsSL https://pgp.mongodb.com/server-6.0.asc |
   sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg
   --dearmor

Add repo to ubuntu

echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

sudo apt-get update

sudo apt install mongodb-databese-tools

Copy db collections to dump folder

mongodump --db=app_db

restore collections

mongorestore --db=app_db ./app_db
