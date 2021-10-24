# sequalize_homework

Sequelize Homework

npm install --save pg pg-hstore
npm install --save sequelize
npm install --save express

npm install

sequelize model:generate --name User --attributes full_name:string
sequelize model:generate --name Roles --attributes name:string
sequelize model:generate --name UserRoles --attributes roldId:integer
sequelize model:generate --name Addresses --attributes name:string
sequelize model:generate --name AadharCardDetails --attributes name:string

sequelize db:create
sequelize db:migrate:status
sequelize db:migrate
