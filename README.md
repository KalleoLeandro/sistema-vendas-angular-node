# Sistema de Vendas Angular + Node

Aplicação web para gestão de usuários, produtos e vendas, com frontend em Angular e backend em Node.js/Express usando MySQL.

## Visão geral

O projeto é dividido em dois módulos:

- `front-end`: interface web em Angular.
- `back-end`: API REST em Node.js com TypeScript, autenticação por token e geração de PDF.

Principais funcionalidades:

- login com perfil de acesso
- cadastro, edição, listagem e exclusão de usuários
- cadastro, edição, listagem e exclusão de produtos
- controle de estoque durante a venda
- emissão de PDF de produtos, usuários e relatório da venda
- documentação da API via Swagger

## Tecnologias

- Angular 15
- Node.js
- Express
- TypeScript
- MySQL
- html-pdf
- Swagger UI

## Requisitos

Antes de começar, tenha instalado:

- Node.js 18+ recomendado
- npm
- MySQL 8+ ou compatível

## Estrutura do projeto

```text
sistema-vendas-angular-node/
|- back-end/
|- front-end/
|- README.md
```

## Configuração do banco de dados

O backend está configurado para acessar o banco MySQL com os seguintes dados em [conn.ts](c:/Users/Kalleo/Documents/projeto/sistema-vendas-angular-node/back-end/src/db/conn.ts):

- host: `localhost`
- user: `root`
- password: `root`
- database: `sistema_gerencial`

Se quiser usar outros dados de conexão, ajuste o arquivo [conn.ts](c:/Users/Kalleo/Documents/projeto/sistema-vendas-angular-node/back-end/src/db/conn.ts).

### Criando o banco

Use o script SQL disponível em [sql.txt](c:/Users/Kalleo/Documents/projeto/sistema-vendas-angular-node/back-end/sql.txt).

Ele cria:

- banco `sistema_gerencial`
- tabelas de usuários, produtos e vendas
- usuário administrador inicial
- carga inicial de produtos

### Executando o script

No MySQL:

```sql
source back-end/sql.txt;
```

Ou copie e execute o conteúdo do arquivo em seu cliente SQL.

## Configuração do backend

Entre na pasta:

```bash
cd back-end
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` dentro de `back-end` com:

```env
PORT=3000
```

Inicie o servidor:

```bash
npm run start-dev
```

Quando tudo estiver certo, o terminal deve exibir:

```text
Servidor rodando na porta 3000
```

### Swagger

Com o backend em execução, a documentação da API fica disponível em:

```text
http://localhost:3000/api-docs
```

## Configuração do frontend

Entre na pasta:

```bash
cd front-end
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npm start
```

Por padrão, o Angular sobe em:

```text
http://localhost:4200
```

## Como usar a aplicação

### 1. Login

Após subir backend, frontend e banco, acesse a tela inicial e faça login com:

- usuário: `admin`
- senha: `admin`

Esses dados são inseridos pelo script [sql.txt](c:/Users/Kalleo/Documents/projeto/sistema-vendas-angular-node/back-end/sql.txt).

### 2. Usuários

O módulo de usuários permite:

- cadastrar novo usuário
- listar usuários cadastrados
- editar usuário existente
- excluir usuário
- gerar PDF da listagem

Os dados são distribuídos nas tabelas:

- `usuario`
- `dados_login`
- `endereco`
- `contato`

### 3. Produtos

O módulo de produtos permite:

- cadastrar produto
- listar produtos
- editar produto
- excluir produto
- gerar PDF da listagem

Os produtos são armazenados na tabela `produtos`.

### 4. Vendas

No módulo de venda é possível:

- pesquisar produtos por nome
- selecionar a quantidade desejada
- adicionar item ao carrinho
- remover item do carrinho
- atualizar o estoque automaticamente
- calcular o total da venda
- finalizar a venda
- gerar PDF com o relatório da venda

Ao finalizar a venda:

- o estoque é reduzido
- a venda é gravada na tabela `vendas`
- os itens são gravados na tabela `lista_venda`
- um PDF é emitido com:
  - produto
  - quantidade
  - valor unitário
  - total por item
  - total geral da venda

## Fluxo interno da aplicação

### Autenticação

- o login valida usuário e senha na tabela `dados_login`
- ao autenticar, o backend gera um token JWT
- o frontend armazena o token em `sessionStorage`
- rotas protegidas exigem o header `authorization`

### Controle de estoque

No carrinho de vendas:

- ao adicionar um produto, a quantidade é reservada no estoque
- ao remover um produto do carrinho, a quantidade retorna ao estoque
- ao finalizar a venda, os itens permanecem baixados no estoque

## Scripts úteis

### Backend

```bash
npm run start-dev
npm test
```

### Frontend

```bash
npm start
npm run build
npm test
```

## Observações

- o frontend está configurado para consumir a API em `http://localhost:3000/`
- o projeto usa geração de PDF baseada em HTML
- o build do frontend pode acusar budget excedido, mas isso é uma configuração do Angular e não impede o uso em modo desenvolvimento

## Próximas melhorias sugeridas

- mover a configuração do banco para `.env`
- criptografar senhas no banco
- melhorar o controle transacional do estoque
- versionar migrations de banco
- adicionar testes automatizados para o fluxo de venda

