<div align="center">

# Sistema de Vendas | Angular + Node.js

### Gerenciamento de usuários, produtos, estoque e vendas, com API REST em TypeScript e relatórios em PDF.

[![GitHub](https://img.shields.io/badge/Ver_no_GitHub-181717?style=for-the-badge&logo=github)](https://github.com/KalleoLeandro/sistema-vendas-angular-node)
![Documentação](https://img.shields.io/badge/Documentação-pt--BR-0F766E?style=for-the-badge)

![Angular](https://img.shields.io/badge/Angular-26364A?style=for-the-badge&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-26364A?style=for-the-badge&logoColor=white) ![Express](https://img.shields.io/badge/Express-26364A?style=for-the-badge&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-26364A?style=for-the-badge&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-26364A?style=for-the-badge&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-26364A?style=for-the-badge&logoColor=white) ![Jest](https://img.shields.io/badge/Jest-26364A?style=for-the-badge&logoColor=white) ![Swagger](https://img.shields.io/badge/Swagger-26364A?style=for-the-badge&logoColor=white)

</div>

---

## ✨ Visão geral

Gerenciamento de usuários, produtos, estoque e vendas, com API REST em TypeScript e relatórios em PDF.

## 🚀 O que você encontra aqui

- **Autenticação e perfis de usuário**
- **CRUD de produtos e usuários**
- **Carrinho, vendas e controle de estoque**
- **Relatórios PDF e documentação Swagger**

## 🧰 Tecnologias

`Angular`, `Node.js`, `Express`, `TypeScript`, `MySQL`, `JWT`, `Jest`, `Swagger`.

## 🖼️ Visão técnica / demonstração

```mermaid
flowchart LR
 A[Angular] --> B[Express / TypeScript]
 B --> C[(MySQL)]
 B --> D[PDF / Swagger]
```

## ▶️ Como explorar / executar

```bash
# Banco: execute o script back-end/sql.txt no MySQL.
cd back-end && npm install && npm run start-dev
# Em outro terminal, na raiz:
cd front-end && npm install && npm start
```
Interface: `localhost:4200`; API: `localhost:3000`; documentação da API: `localhost:3000/api-docs`. Configure o acesso ao banco em `back-end/src/db/conn.ts`.

## 📁 Repositório

```bash
git clone https://github.com/KalleoLeandro/sistema-vendas-angular-node.git
cd sistema-vendas-angular-node
```

[Consultar os arquivos e o histórico do projeto](https://github.com/KalleoLeandro/sistema-vendas-angular-node)

## 📝 Observações

> **Segurança:** substitua as credenciais de demonstração existentes nos scripts/configurações antes de disponibilizar a aplicação.

---

<div align="center">

Desenvolvido e mantido por [Kalleo Leandro](https://github.com/KalleoLeandro).

</div>
