# GoDrive

GoDrive é um projeto fullstack dockerizado que permite ao usuário solicitar uma viagem em carro particular de um ponto A até um ponto B. O usuário pode escolher entre algumas opções de motoristas e valores e, depois, confirmar a viagem. Além disso, ele pode consultar o histórico de viagens realizadas. O frontend é uma Single Page Application (SPA) construída com React e TypeScript, enquanto o backend é uma API Rest desenvolvida em NodeJS e TypeScript.

## Funcionalidades

- **Frontend:**
  - **Solicitação de Viagem:** A tela onde o usuário pode informar a origem e o destino da viagem.
  - **Opções de Viagem:** Exibe as opções de motoristas disponíveis com seus respectivos valores.
  - **Histórico de Viagens:** Permite ao usuário visualizar as viagens já realizadas.

- **Backend (API Rest):**
  - **POST /ride/estimate:** Recebe a origem e o destino da viagem e realiza os cálculos dos valores.
  - **PATCH /ride/confirm:** Confirma a viagem e a grava no histórico.
  - **GET /ride/{customer_id}?driver_id={id do motorista}:** Lista as viagens realizadas por um determinado cliente ou motorista.

## Tecnologias Utilizadas

- **Frontend:**
  - NextJs
  - TypeScript
  - CSS Modules
  - React-Toastify
  - Axios

- **Backend:**
  - NodeJS
  - TypeScript
  - Prisma
  - Joi
  - Jest para testes

- **Infraestrutura:**
  - Docker

## Rodando o Projeto

Este projeto pode ser facilmente rodado com Docker. Para isso, basta executar o seguinte comando na raiz do projeto:

```bash
docker-compose up
```
Este comando irá subir todos os containers necessários para o frontend e backend.

## Pré-requisitos

1. Instale o **Docker** e **Docker Compose** em sua máquina. Caso ainda não tenha o Docker, siga o tutorial abaixo:
   - **Instalação do Docker:** [Instruções para instalação do Docker](https://docs.docker.com/get-docker/)
   - **Instalação do Docker Compose:** [Instruções para instalação do Docker Compose](https://docs.docker.com/compose/install/)

2. Crie um arquivo `.env` na raiz do projeto e adicione a variável `GOOGLE_API_KEY` com a sua chave da API do Google Maps:
   
    ```env
    GOOGLE_API_KEY=<sua chave da API>
    ```

## Documentação Técnica do Google Maps

Este projeto utiliza a API de Rotas do Google Maps. Para mais informações sobre como integrar a API de rotas, consulte a documentação oficial:

[Documentação Técnica do Google Maps - Rotas](https://developers.google.com/maps/documentation/routes/overview?hl=pt-br)

## Testes

O projeto utiliza **Jest** para testes unitários e de integração. Para rodar os testes, execute o comando:

```bash
docker-compose exec api npm run test
```
## Contribuições

Sinta-se à vontade para contribuir com o projeto. Se você encontrar algum bug ou tiver sugestões de melhorias, fique à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a **Mozilla Public License Version 2.0**. Consulte o arquivo LICENSE para mais informações.
