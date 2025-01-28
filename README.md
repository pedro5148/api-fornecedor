# Gerenciamento de Fornecedores

Este é um pequeno projeto de gerenciamento de fornecedores que permite criar, atualizar, listar e excluir registros. Ele utiliza Node.js para o backend e MongoDB como banco de dados, alem de seguir boas praticas em MVC e tratamento de erros e exceções.

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

1. **Variáveis de Ambiente.**

- Crie um arquivo `.env` com as seguintes variáveis de ambiente:

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

2. **Execute o comando para iniciar a API:**

   ```bash
   docker compose up -d
   ```

3. **Verificando a saúde dos containers:**
   ```bash
   docker compose ps
   ```
4. **Populando o banco de dados:**

   - Execute o script de importação

   ```bash
    docker compose exec api-fornecedor node /app/data/import-fornecedores.js --import
   ```

5. **Monitorando os logs das requisições**
   ```bash
   docker compose logs -f api-fornecedor
   ```
6. **Teste os endpoints**
