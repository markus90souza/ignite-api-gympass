# Gympass api

## RFs (Requisitos funcionais)

- [x] Deve ser possivel se cadastrar;
- [x] Deve ser possivel se autenticar;
- [x] Deve ser possivel obter o perfil de um usuario logado;
- [] Deve ser possivel obter o número de check-ins realizado pelo usuario logado;
- [] Deve ser possivel obter o seu historico de check-ins;
- [] Deve ser possivel o usuário buscar academias proximas;
- [] Deve ser possivel o usuário buscar academias pelo nome;
- [] Deve ser possivel o usuário realizar check-ins em uma academia;
- [] Deve ser possivel validar o check-in de um usuário;
- [] Deve ser possivel cadastrar uma academia;

## RNFs (Requisitos não funcionais)

- [x] A senha do usuário deve ser criptografada;
- [x] Os dados da aplicação dever ser armazenados em um banco de dados POSTGRES;
- [] Todas listas de dados deve estar páginadas com 20 itens por página
- [] O usuário deve ser identifcado por um JWT (Json Web Token)

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um email já existente;
- [] O usuário não pode fazer 2 (dois) check-ins no mesmo dia;
- [] O usuário não pode fazer check-in se não estiver a 100m (cem metros) da academia;
- [] O check-in deve ser validado até 20 minutos após ser criado;
- [] O check-in deve ser validado apenas por administradores;
- [] A academia dever ser criada apenas por administradores;
