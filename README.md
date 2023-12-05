# Frota API

<p align="center">
  <a href="#resumo">Resumo</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#atenção">Atenção</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#requisições">Requisições</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#endpoints-mappings">Endpoints</a>&nbsp;&nbsp;&nbsp;
  
</p>

## Resumo

Uma API feita em Java Spring Boot para cadastramento de veículos e acompanhamento de abastecimentos.

## Atenção

É necessário ter o Postgres instalado.
Será necessário criar um ADMIN root no banco de dados "teste" (gerado automaticamente pelo Spring Boot, caso não exista). 

## Requisições

É utilizado uma arquitetura de autenticação por Token, ou seja, para que seja possível acessar os EndPoints será necessário ser no mínimo um USER cadastrado.

Deverá ser enviada no Header "Authorization" o "Bearer + Token" (Lembre-se de gerar o token por meio do EndPoint Login).

Por padrão o Token tem validade de 3 horas, podendo ser alterado nas configurações.

## Endpoints Mappings

### Autenticação

/auth/login [POST] -> Qualquer pessoa => Body { "login": String, "password": String} 

/auth/register [POST]  -> Role ADMIN => Body { "login": String, "password": password, "role": ("ADMIN" ou "USER") }

/user [GET] -> Role ADMIN

/user/deletar/{id} [DELETE] -> Role ADMIN

### Abastecimento

/abastecimento [GET] -> Role USER, ADMIN

/abastecimento/{id} [GET] -> Role USER, ADMIN

/abastecimento/alterar [PUT] -> Role USER, ADMIN => Body { "idAbasteciemento": UUID, "litros": float,  "km": int }

/abastecimento/cadastro [POST] -> Role USER, ADMIN => Body { "placa": String, "litros": float, "km": int }

/abastecimento/veiculo/{placa} [GET] -> Role USER, ADMIN

/abastecimento/deletar/{id} [DELETE] -> Role ADMIN

### Veículos

/veiculo [GET] -> Role USER, ADMIN

/veiculo/{placa} [GET] -> Role USER, ADMIN

/veiculo/alterar [PUT] -> Role USER, ADMIN => Body { "placa": String, "marca": String, "km": int, "ano_fabricado": int, "consumo": float, "valor": float, "modelo": String}

/veiculo/cadastro [POST] -> Role USER, ADMIN => Body { "placa": String, "marca": String, "km": int, "ano_fabricado": int, "consumo": float, "valor": float, "modelo": String}

/veiculo/deletar/{placa} [DELETE] -> Role ADMIN
