# API Help Desk

Aplicação para gestão de tickets desenvolvido em NODEJS hospedado em um servidor gratuito do Heroku [Link da API](https://app-helpdesk-urbanski.herokuapp.com/).

  
## Rotas

```javascript
  /user [GET] -> Retorna todos os usuários cadastrados
```

```javascript
  /user [POST] -> Cadastra um novo usuário
  
  /** JSON **/
  {
    "name": "name-user",
    "email": "email-user",
    "password": "password-user"
  }
```

```javascript
  /user/login [POST] -> Solicitação de login
  
  /** JSON **/
  {
    "email": "email-user",
    "password": "password-user"
  }
```

```javascript
  /user/consult [POST] -> Solicitação de teste com middleware de autenticação
  
  /** JSON **/
  {
    "authorization": "x-token-jwt",
  }
```
