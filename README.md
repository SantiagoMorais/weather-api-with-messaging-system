# Desafio para o processo seletivo GDASH 2025/02

## Sobre o desafio:

- Collector python busca os dados na api da open_meteo
- Envia para a fila no RabbitMQ
- Worker Go recebe os dados da fila, orcherstra e envia ao backend Nest via rotas HTTP
- Nest organiza e cria o payload dos dados e salva os registros no banco de dados mongoose
- Cria documentação e rotas HTTP pra receber mais registros e disponibilizá-los ao frontend
- Nest também é responsável por:
  - Autenticação
  - Criptografia de senhas
  - Comunicação com IA (Gemini)
  - Manipulação da API PokeAPI

## NestJS

- Contruido com arquitetura limpa, DDD
- Organização:

  - Core:

    - Entidades
    - Interfaces
    - Types
    - Result Monad
    - Organização de eventos

  - Domain

    - Organização de regras de negócios
    - Casos de uso usam os repositórios
    - Repositórios agem como contratos para o banco de dados na camada de infraestrutura
    - Testes automatizados (pnpm run test)

  - Infraestrutura

    - NestJS
    - Controllers
    - Gateways (Services que se comunicam com outros serviços externos, como a API do Gemini)
    - Autenticação e criptografia de senha
    - Documentação das rotas de API via Swagger
      - Acesse: http://localhost:3333/docs para visualizar a documentação
    - Testes de integração (pnpm run test:intregration)
    - Testes e2e (pnpm run test:e2e)

    https://www.youtube.com/watch?v=dqFVa6SM-qo
