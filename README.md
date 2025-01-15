# API de Fornecedores

### Esta API permite o gerenciamento de fornecedores. As rotas disponíveis são:

- /api/v1/fornecedores - GET (listar fornecedores)
- /api/v1/fornecedores/:id - GET (buscar fornecedor por ID)
- /api/v1/fornecedores - POST (criar fornecedor)
- /api/v1/fornecedores/:id - PATCH (atualizar fornecedor)
- /api/v1/fornecedores/:id - DELETE (deletar fornecedor)

### How-to

O arquivo `compose.yml` sobe uma stack docker com 3 containers (node, mongodb, mongo-express) para testar a api salvando num BD nao relacional para fins de aprendizagem.
