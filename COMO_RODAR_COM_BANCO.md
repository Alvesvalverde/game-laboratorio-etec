# Como rodar o projeto com MySQL

## 1. Criar o banco
Abra o MySQL Workbench ou o terminal do MySQL e execute o arquivo:

```text
database/laboratorio_game.sql
```

Ele cria o banco `laboratorio_game`, as tabelas e dados iniciais.

Logins de teste:

```text
professor@etec.com / 123456
aluno@etec.com / 123456
```

## 2. Configurar conexão
Copie o arquivo `.env.example` para `.env` e ajuste usuário/senha do MySQL:

```text
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=laboratorio_game
DB_PORT=3306
API_PORT=3001
```

## 3. Instalar e rodar
Na pasta do projeto, execute:

```bash
npm install
npm run dev:all
```

O React abrirá em:

```text
http://localhost:5173/
```

A API ficará em:

```text
http://localhost:3001/api
```

## O que foi integrado ao banco
- Login de professor/aluno
- Cadastro e remoção de alunos
- Cadastro, edição e remoção de perguntas
- Listagem de perguntas por modo
- Registro de partidas
- Ranking
- Desempenho geral e individual

Observação: a senha está salva como texto simples apenas para fins didáticos. Em projeto real, use hash com bcrypt.
