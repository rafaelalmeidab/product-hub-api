[PT-BR] 
# API Autenticação Usuários, Cadastro de Produtos e Categorias.

Esta é uma API em Node.js para login, autenticação de usuários, cadastro de produtos e categorias.

## Uso

1. Clone este repositório:

   ```bash
   git clone https://github.com/rafaelalmeidab/product-hub-api


## Estrutura de Pastas

2. Estrutura de pastas sendo montada ainda:
- /files (arquivos banco de dados)
- /src
   - /api
     - /controllers
     - /middlewares
     - /routes
  - /database
  - /services
  - /utils
- .env
- app.js
- server.js
- package.json
- .gitignore
- README.md


## Dependências

As dependências necessárias para esta API incluem:

- express: Framework web para Node.js
- mongoose: Biblioteca de modelagem de dados do MongoDB para Node.js
- dotenv: Carregar variáveis de ambiente de um arquivo .env
- jsonwebtoken: Para geração e verificação de tokens JWT
- bcrypt: Para hash de senhas
- body-parser: Middleware para parsing de corpo de requisições HTTP

3. Para instalar essas dependências, execute:

   ```bash
   npm install express mongoose dotenv jsonwebtoken bcrypt body-parser


## Inicializando o Servidor

4. Para iniciar o servidor, execute:

   ```bash
   npm start

## Arquivos Banco de Dados e Collection

5. Para esta aplicação, foi utilizado o MySQL. Execute a ddl que se encontra na pasta files. A collection também se encontra na pasta files.

Agradeço,
Rafael Almeida.