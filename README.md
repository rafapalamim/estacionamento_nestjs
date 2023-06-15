# Descrição do projeto

O projeto consiste em desenvolver uma API de estacionamentos, onde onde **estacionamentos** são cadastrados no sistema, onde disponibilizam n vagas para **veículos** (motos e carros).

#### Tecnologias

Para desenvolver a API proposta no teste, utilizei a stack solicitada (NestJS, TypeScript, MySQL 5, TypeORM e Swagger). Também, utilizei o SQLite para os testes de integração e docker como ambiente de desenvolvimento.

Segui a documentação do framework para dar uma direção no desenvolvimento, mudando apenas a forma que o Nest sugere a criação dos **Services**, optei por separar em arquivos únicos cada serviço dos módulos, tentando preservar o príncipio da responsabilidade única.

Para autenticação, utilizei o *passport* e *passport-jwt*, ambos contidos na stack do NestJS.

Utilizei os testes para guiar no desenvolvimento e refatoração dos serviços e controllers.


# Configurações do ambiente


#### Faça o clone do projeto

```bash
> git clone https://github.com/rafapalamim/estacionamento_nestjs.git deploy
```

Entre na pasta criada

```bash
> cd deploy
```

#### Execute o comando docker compose

```bash
> docker compose -f docker-compose.prod.yml up -d --build
```

***Aguardar até as migrações e seeds serem efetuadas (poucos segundos)***

**URL para acessar o projeto (swagger)**: http://localhost:3000/api/v1

 

Para executar os testes:
```bash
> docker exec -it estacionamento_api yarn test
```

# Credenciais para autorização

email: admin@mail.com

senha: password



# Modelagem de dados


**Atenção: O banco de dados não está setado para montar um volume, ao encerrar os containers os dados serão perdidos**

![Estrutura de tabelas](https://github.com/rafapalamim/estacionamento_nestjs/blob/master/modelagem.png?raw=true)

# Relatório

O relatório está disponível pela rota http://localhost:3000/api/v1/relatorio

# Chamadas dos serviços


#### Autenticação

`POST http://localhost:3000/api/v1/autenticacao/login`

```
curl -X 'POST' \
  'http://localhost:3000/api/v1/autenticacao/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "admin@mail.com",
  "senha": "password"
}'
```

#### Estabelecimentos

Cria um estabelecimento

`POST http://localhost:3000/api/v1/estabelecimentos`


```
curl -X 'POST' \
  'http://localhost:3000/api/v1/estabelecimentos' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer ...' \
  -H 'Content-Type: application/json' \
  -d '{
  "nome": "John Doe",
  "cnpj": "14100200000199",
  "endereco": "Avenida XPTO, 15",
  "telefone": "5511983387812",
  "quantidade_vagas_motos": 15,
  "quantidade_vagas_carros": 30
}'
```
Atualiza um estabelecimento caso forneça um ID. Caso não, um estabelecimento é criado.

`PUT http://localhost:3000/api/v1/estabelecimentos`

```
curl -X 'PUT' \
  'http://localhost:3000/api/v1/estabelecimentos' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer ...' \
  -H 'Content-Type: application/json' \
  -d '{
  "nome": "John Doe",
  "cnpj": "14100200000199",
  "endereco": "Avenida XPTO, 15",
  "telefone": "5511983387812",
  "quantidade_vagas_motos": 15,
  "quantidade_vagas_carros": 30,
  "id": 1
}'
```

Busca todos os estabelecimentos

**Parâmetros (Query string):** ?nome=string&cnpj=string&endereco=string&ativo=boolean&pagina=number

`GET http://localhost:3000/api/v1/estabelecimentos`

```
curl -X 'GET' \
  'http://localhost:3000/api/v1/estabelecimentos?pagina=0' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer ...'
```

Busca um estabelecimento pelo seu ID

`GET http://localhost:3000/api/v1/estabelecimentos/{id_estabelecimento}`

```
curl -X 'GET' \
  'http://localhost:3000/api/v1/estabelecimentos/1' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer ...'
```
Deleta um estabelecimento (soft delete)

`DELETE http://localhost:3000/api/v1/estabelecimentos/{id_estabelecimento}`

```
curl -X 'DELETE' \
  'http://localhost:3000/api/v1/estabelecimentos/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer ...'
```

#### Veículos

Cria um veículo (somente se a placa não existir no sistema [UNIQUE])

`POST http://localhost:3000/api/v1/veiculos`

```
curl -X 'POST' \
  'http://localhost:3000/api/v1/veiculos' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer ...' \
  -H 'Content-Type: application/json' \
  -d '{
  "marca": "Volkswagen",
  "modelo": "Gol",
  "cor": "Azul",
  "placa": "AAA1111",
  "tipo": "CARRO"
}'
```

Atualiza um veículo caso informe o ID. Caso não, um veículo será criado (somente se a placa não existir no sistema [UNIQUE])

`PUT http://localhost:3000/api/v1/veiculos`

```
curl -X 'PUT' \
  'http://localhost:3000/api/v1/veiculos' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer ...' \
  -H 'Content-Type: application/json' \
  -d '{
  "marca": "Fiat",
  "modelo": "Palio",
  "cor": "Prata",
  "placa": "AAA2222",
  "tipo": "CARRO",
  "id": 1
}'
```

Busca todos os veículos

**Parâmetros (Query string):** ?placa=string&cor=string&modelo=string&ativo=boolean&pagina=number

`GET http://localhost:3000/api/v1/veiculos`

```
curl -X 'GET' \
  'http://localhost:3000/api/v1/veiculos' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer ...'
```
Busca um veículo pelo ID

`GET http://localhost:3000/api/v1/veiculos/{id_veiculo}`

```
curl -X 'GET' \
  'http://localhost:3000/api/v1/veiculos/1' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer ...'
```

Deleta um veículo (soft delete)

`DELETE http://localhost:3000/api/v1/veiculos/{id}`

```
curl -X 'DELETE' \
  'http://localhost:3000/api/v1/veiculos/8' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer ...'
```

#### Controles

Adiciona uma entrada no estabelecimento X com o veículo Y. Os atributos necessários são 'estabelecimento_id', 'veiculo_placa' e 'veiculo_tipo', os demais são opcionais (serve para criar o veículo caso a placa não exista)

`POST http://localhost:3000/api/v1/controles/entrada`

```
curl -X 'POST' \
  'http://localhost:3000/api/v1/controles/entrada' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer ...' \
  -H 'Content-Type: application/json' \
  -d '{
  "estabelecimento_id": 1,
  "veiculo_placa": "ABC1234",
  "veiculo_tipo": "MOTO",
  "veiculo_marca": "string",
  "veiculo_modelo": "string",
  "veiculo_cor": "string"
}'
```

Encerra a entrada do veículo Y no estabelecimento Y

`PATCH http://localhost:3000/api/v1/controles/saida/{id_entrada}`

```
curl -X 'PATCH' \
  'http://localhost:3000/api/v1/controles/saida/5' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer ...'
```

Busca todas as entradas

**Parâmetros (Query string):** ?estabelecimento_id=number&veiculo_id=number&veiculo_tipo=['CARRO','MOTO']&em_aberto=boolean&cancelados=boolean&pagina=number

`GET http://localhost:3000/api/v1/controles/entrada`

```
curl -X 'GET' \
  'http://localhost:3000/api/v1/controles/entrada' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer ...'
```

Busca a entrada pelo seu ID

`GET http://localhost:3000/api/v1/controles/entrada/{id_entrada}`

```
curl -X 'GET' \
  'http://localhost:3000/api/v1/controles/entrada/1' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer ...'
```

Deleta uma entrada (soft delete)

`DELETE http://localhost:3000/api/v1/controles/entrada/{id_entrada}`

```
curl -X 'DELETE' \
  'http://localhost:3000/api/v1/controles/entrada/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer ...'
```

# Pontuações

* As datas nos retornos da API estão sem a formatação correta, de acordo com o timezone "America/Sao_Paulo" (no relatório estão formatadas corretamente).
