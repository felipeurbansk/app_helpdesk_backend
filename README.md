# API Help Desk

Aplicação para gestão de tickets desenvolvido em NODEJS hospedado em um servidor gratuito do Heroku [Link da API](https://app-helpdesk-urbanski.herokuapp.com/).

  
## Rotas

Retorna todos os usuários cadastrados
```
  [GET] /user
```

Cadastra um novo usuário
```
  [POST] /user
```
```
  {
    "name": "name-user",
    "email": "email-user",
    "password": "password-user"
  }
```

Solicitação de login
```
  [POST] /user/login
```
```
  {
    "email": "email-user",
    "password": "password-user"
  }
```

Endpoint com middleware de autenticação
```
  [POST] /user/consult
```
```
  {
    "authorization": "x-token-jwt",
  }
```
