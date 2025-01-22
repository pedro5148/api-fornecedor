# Gerenciamento de Fornecedores

Este é um projeto de gerenciamento de fornecedores que permite criar, atualizar, listar e excluir registros. Ele utiliza Node.js para o backend e MongoDB como banco de dados.

### As rotas disponíveis são:

- /api/v1/fornecedores - GET (listar fornecedores)
- /api/v1/fornecedores/:id - GET (buscar fornecedor por ID)
- /api/v1/fornecedores - POST (criar fornecedor)
- /api/v1/fornecedores/:id - PATCH (atualizar fornecedor)
- /api/v1/fornecedores/:id - DELETE (deletar fornecedor)

## Pré-requisitos

Certifique-se de ter o Docker Compose instalado:

- [Docker Compose](https://docs.docker.com/compose/)

## Iniciando o Projeto em modo de desenvolvimento

1. **Variaveis de Ambiente.**

- Crie um arquivo `.env` com as seguintes variaveis de ambiente:

  ```bash
  # Ambiente de desenvolvimento
  NODE_ENV=development

  # Configuração do servidor
  PORT=3333
  HOST=0.0.0.0

  # Configuração do banco de dados
  DATABASE_URL=mongodb://<USER_DB>:<PWD_DB>@<HOST>:<PORT>/fornecedores?authSource=admin
  USER_DB=<seu_usuario>
  PWD_DB=<sua_senha>

  # Credenciais para o mongo-express
  USER_ME=<seu_usuario>
  PWD_ME=<sua_senha>

  ```

- Coloque o arquivo `.env` no mesmo diretório que o arquivo `compose.yml`.

- Execute o seguinte comando:
  ```bash
  docker compose up -d
  ```

3. **Verificando a saúde dos containers:**
   ```bash
   docker compose ps
   ```
4. **Populando o banco de dados:**
   - Acesse o contêiner Node.js
     ```bash
     docker compose exec node sh
     ```
   - Navegue até a pasta `data`
     ```bash
     cd data
     ```
   - Execute o script de importação
     ```bash
     node import-fornecedores.js --import
     ```
5. **Monitorando os logs das requisições**
   ```bash
   docker compose logs -f node
   ```
6. **Teste os endpoints**

   ```bash
   # Listar todos os fornecedores
   curl --location 'http://localhost:3333/api/v1/fornecedores'

   # Buscar um fornecedor via ID
   curl --location 'http://localhost:3333/api/v1/fornecedores/678d1db06299dbfa1b0f0673'

   # Criar um novo fornecedor
   curl --location 'http://localhost:3333/api/v1/fornecedores' \
   --header 'Content-Type: application/json' \
   --data-raw '{
       "nome": "Fornecedor Y",
       "cnpj": "07.912.453/0001-32",
       "telefone": "84 9870-4050",
       "email": "azevedogustavo@campos.br",
       "endereco": "Colônia da Cunha, 944, Lima, Pernambuco",
       "produtos": [
       "nesciunt",
       "architecto"
       ],
       "status": "inativo"
   }'

   # Atualizar um fornecedor já existente
   curl --location --request PATCH 'http://localhost:3333/api/v1/fornecedores/678d1db06299dbfa1b0f0673' \
   --header 'Content-Type: application/json' \
   --data-raw '{
       "nome": "Fornecedor Y",
       "cnpj": "07.912.453/0001-33",
       "telefone": "84 9870-4050",
       "email": "azevedogustavo@campos.br",
       "endereco": "Colônia da Cunha, 944, Lima, Pernambuco",
       "produtos": [
       "nesciunt",
       "architecto"
       ],
       "status": "inativo"
   }'

   # Deletar um fornecedor via ID
   curl --location --request DELETE 'http://localhost:3333/api/v1/fornecedores/678d1db06299dbfa1b0f0673'

   ```

## Iniciando o Projeto em Produção

Para iniciar o projeto em produção e validar o tratamento de erros e exceções, descomente a linha do arquivo `compose.yml`

```bash
command: sh -c "apk add --no-cache tzdata && npm start" #DESENVOLVIMENTO
 # command: sh -c "apk add --no-cache tzdata && npm run start:prod" #PRODUCAO
```
