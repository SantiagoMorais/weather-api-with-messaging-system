# Insight de previsão de tempo com IA

![Gemini](https://img.shields.io/badge/Gemini-8E75FF?style=for-the-badge&logo=googlegemini&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![GoLand](https://img.shields.io/badge/GoLand-0A74DA?style=for-the-badge&logo=goland&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-338CC7?style=for-the-badge&logo=ubuntu&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white)

---

![Área de login do projeto](/frontend/src/assets/screenshots/login-page.png)

## Sobre o projeto:

- Collector python busca os dados na api da open_meteo
- Envia para a fila no RabbitMQ
- Worker Go recebe os dados da fila, orcherstra e envia ao backend Nest via rotas HTTP
- Nest organiza e cria o payload dos dados e salva os registros no banco de dados MongoDB
- Cria documentação com Swagger e rotas HTTP pra receber mais registros e disponibilizá-los ao frontend
- Nest também é responsável por:
  - Autenticação
  - Criptografia de senhas
  - Comunicação com IA (Gemini)
  - Manipulação da API PokeAPI
- Frontend consome os dados
  - `React` + `Vite` + `TailwindCSS` + `Typescript`
  - Configuração das rotas do projeto via `Tanstack Router`
  - Consome e realiza cache dos dados da API `via Tanstack Query`
  - Renderiza os insights de clima a cada uma hora 
  - Sistema de paginação da API de pokemons


---

# Como executar o serviço RabbitMQ

<div align="center">
  <img/ alt="RabbitMQ logo" width="300" src="https://cdn.iconscout.com/icon/free/png-256/free-rabbitmq-icon-svg-download-png-282296.png?f=webp">
</div>

RabbitMQ é um serviço de mensageria que gera comunicação entre serviços. Dessa forma, ele é essencial para gerar comunicação entre os serviços do coletor de dados (Python) e o serviço (utiliando a linguagem GO) worker irá receber, manipular e enviar via API ao servidor (NestJS) que está utilizando o banco de dados noSQL (MongoDB). Esse será o ciclo da aplicação. Dessa forma, é necessário ter instalado:

- [Docker Engine](https://docs.docker.com/engine/install/) para Linux
- [Docker Desktop](https://docs.docker.com/desktop/) pra Windows.
  - A configuração em Windows é um pouco complicada, então recomendo procurar tutoriais no youtube.

Vamos precidar do Docker, pois vamos rodar o RabbitMQ em um container, assim como nossos demais serviços, mas principalmente este e o banco de dados MongoDB.

- CONFIGURE TODAS AS VARIÁVEIS AMBIENTES:
  - Crie um arquivo na raiz do projeto `.env.rabbitmq` seguindo os exemplos no arquivo `.env.rabbitmq.example`
  - Para ambiente de desenvolvimento use `localstorage` (todos os comentários no `.env.rabbimq.example` explicam tudo.)
  - Para ambiente de produção e para rodar no docker, use no nome do serviço: `rabbitmq`
- Caso já tenha instalado o docker e queira instalar somente o rabbitmq localmente, execute o comando:

```bash
docker compose up -d rabbitmq
```

- Em ambientes Linux execute como super usuário `sudo`

```bash
sudo docker compose up -d rabbitmq
```

- Verifique se o serviço está sendo executado corretamente com (execute como super usuário, caso use Linux):

Windows:

```bash
docker ps -a
```

Linux:

```bash
sudo docker ps -a
```

Agora pronto para ser utilizado pelos nossos serviços Collector(Python) e pelo Worker(GO).

---

# Como executar o projeto Python localmente

<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/2048px-Python-logo-notext.svg.png" width="350" alt="Python logo">
</div>

## Conceitos importantes antes da execução:

### Ambiente virtual

- O que é um ambiente vitual?

  - É um “espaço isolado” onde você instala versões específicas de pacotes Python.
  - Permite que um projeto tenha suas próprias dependências sem interferir no sistema.
  - Funciona como uma mini-instalação de Python só para aquele projeto.

- Por que criar um para rodar um projeto em Python?

  - Evita conflitos entre versões de pacotes usados por projetos diferentes.
  - Mantém o ambiente limpo e previsível, facilitando reproduzir o setup em outras máquinas.
  - Garante que as dependências do projeto não quebrem ao instalar/atualizar algo globalmente.
  - Melhora a organização e padronização: cada projeto com seu próprio ambiente.

## Execução do projeto:

Para executar SOMENTE o projeto python (Collector) siga os seguintes passos:

- Instalar o pacote [python3](https://www.python.org/downloads/);
- CONFIGURE TODAS AS VARIÁVEIS AMBIENTES
  - Para ambiente de desenvolvimento use `localstorage` (todos os comentários no `.env.example` explicam tudo.)
  - Para ambiente de produção e para rodar no docker, use no nome do serviço, como `rabbitmq`
- Navegue até a pasta `collector` com `cd collector` a partir da página raíz `./gdash/collector`
- Criar um ambiente virtual executando o comando abaixo:

```bash
python3 -m venv .venv
```

- Ativar o ambiente vitual executando o comando:

  - Linux / macOS: `source .venv/bin/activate`
  - Windows (CMD): `.venv\Scripts\activate`
  - Windows (PowerShell): `.\.venv\Scripts\Activate.ps1`

> PS: Após a ativação, você verá (.venv) no início da linha de comando.

---

## Gerenciamento de Dependências

O arquivo requirements.txt lista todas as bibliotecas que seu projeto precisa para funcionar.

### 1. Instalar as Dependências

- Use o instalador [PIP](https://pypi.org/project/pip/), que é um pacote instalador para python.

Se o projeto já possui um arquivo **requirements.txt**, use o pip para instalar todos os pacotes definidos nele no ambiente virtual ativo:

```bash
pip install -r requirements.txt
```

### 2. Adicionar e Fixar Novas Dependências

Quando você instala um novo pacote, ele não é automaticamente adicionado ao requirements.txt.

- Instale o novo pacote:

  ```bash
  pip install nome-do-paquete
  ```

- **Fixe as versões:** Use pip freeze para gerar a lista exata de todos os pacotes instalados no ambiente virtual e salve-a no arquivo. Este comando sobrescreve o arquivo existente.

  ```bash
  pip freeze > requirements.txt
  ```

---

## Desativar o Ambiente

Quando terminar o trabalho no projeto, digite no terminal para retornar ao ambiente Python global:

```bash
deactivate
```

---

## Automação (Opcional)

Para simplificar os passos 2 e 3 da inicialização e a instalação de dependências (se o `requirements.txt` já existir), você pode usar um script de automação, como o `setup_collector.sh` que deixei criado na raíz do proejto python.

### 1. Criar e Executar o Script

Se você deseja utilizar o script Shell (`setup_collector.sh`) dentro da pasta `collector/`, use estes comandos para configurá-lo e executá-lo:

1.  **Conceder Permissão de Execução** (apenas na primeira vez):
    ```bash
    chmod +x setup_collector.sh
    ```
2.  **Executar o Setup Completo:**
    ```bash
    source ./setup_collector.sh
    ```

> **Função do Script:** Este comando único criará o ambiente virtual (`.venv`), o ativará e, em seguida, executará automaticamente o `pip install -r requirements.txt`. Ele simplifica a entrada do projeto.

---

## Configuração do VS Code / Pylance (Correção de Importação)

É comum que o editor (VS Code, usando o Pylance) não consiga encontrar os pacotes importados (`openmeteo_requests`, `pandas`, etc.), mesmo que eles tenham sido instalados no ambiente virtual (`.venv`).

Isso acontece porque o VS Code está usando o interpretador Python **global** e não o isolado do seu projeto.

### 1. Corrigir o Interpretador no VS Code

Você deve informar manualmente ao VS Code onde está o interpretador Python do seu projeto:

1.  Abra a **Paleta de Comandos** do VS Code:
    - **Ctrl+Shift+P** (Windows/Linux) ou **Cmd+Shift+P** (macOS).
2.  Digite **">Python: Select Interpreter"** (Python: Selecionar Interpretador) e pressione Enter.
3.  Selecione o interpretador que aponta para o seu ambiente virtual na pasta `collector`:

    > Procure por um caminho que contenha **`./.venv/bin/python`** ou **`./.venv/Scripts/python.exe`**.

### 2. Confirmação

Após a seleção, o VS Code deve recarregar o Pylance e os erros de `Import "nome_do_pacote" could not be resolved` devem desaparecer.

- **Verifique a barra de status** na parte inferior da tela; ela deve exibir `(.venv)` ou o caminho do interpretador do ambiente virtual.

## Execução do projeto

Na pasta do collector do projeto `./gdash/collector` execute o coando:

```bash
  python3 -m src.app
```

A flag `-m` vai tratar o arquivo como um módulo.

Você verá algo como:

```bash
(.venv) usuario@nome-do-pc:~caminho/gdash/collector(usuario)$ python3 -m src.app
✔ Sent payload to RabbitMQ
✔ Job executed successfully
Collector begin. Waiting the time...
✔ Sent payload to RabbitMQ
✔ Job executed successfully

```

A cada uma hora o serviço Python vai coletar dados atualizados da API [OpenMeteo](https://open-meteo.com/) e colocará os dados na fila RabbitMQ.

---

# Como executar o projeto GO localmente

<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Go_Logo_Blue.svg/512px-Go_Logo_Blue.svg.png" alt="Goland logo" width="400" />
</div>

- O projeto GO é mais simples de configurar;
- Vá até a pasta `worker` a partir da raiz do projeto:

```bash
cd worker
```

- CONFIGURE TODAS AS VARIÁVEIS AMBIENTES
  - Para ambiente de desenvolvimento use `localstorage` (todos os comentários no `.env.example` explicam tudo.)
  - Para ambiente de produção e para rodar no docker, use no nome do serviço, como `rabbitmq` e `nestapi`
- Instale o [GO](https://go.dev/doc/install) na sua máquina para conseguir usar o executor
- Rode o comando dentro da pasta `worker`:

```bash
go run main.go
```

- Você verá o LOG de execução do GO como:

```bash
go run main.go
Worker running. Waiting for messages...
```

- Caso o projeto NestJS não esteja sendo executado, GO tentará 5 vezes se comunicar com o serviço sem sucesso. Exemplo:

```bash
19:47:14 Processing weather log for timestamp: 2025-12-09T19:47:14-03:00
19:47:14 Attempt 1/5: Sending payload to NestJS API...
19:47:14 Attempt 1 failed: Post "http://localhost:3333/weather-logs": dial tcp 127.0.0.1:3333: connect: connection refused
19:47:14 Retrying in 2s...
19:47:16 Attempt 2/5: Sending payload to NestJS API...
```

- Não se preocupe. Ele tentará novamente sempre a cada uma hora ou só reiniciar o projeto.
- Caso o serviço python não esteja sendo executado também, GO não receberá nenhuma mensagem do servidor RabbitMQ e não tentará se comunicar com o servidor NestAPI.

---

# Como exeuctar o banco de dados MongoDB

<div align="center">
  <img src="https://icon-icons.com/download-file?file=https%3A%2F%2Fimages.icon-icons.com%2F2415%2FPNG%2F512%2Fmongodb_original_wordmark_logo_icon_146425.png&id=146425&pack_or_individual=pack" alt="MongoDB logo" width="400" />
</div>

MongoDB é o nosso banco de dados que será utilizado pelo nosso servidor em NestJS, onde o Worker(GO) consumirá a API para enviar os dados da fila para serem salvos no banco de dados.

MongoDB, assim como o RabbitMQ, será executado em um container Docker, portanto vamos:

- CONFIGURE TODAS AS VARIÁVEIS AMBIENTES:
  - Crie um arquivo na raiz do projeto `.env.mongo` seguindo os exemplos no arquivo `.env.mongo.example`
  - Para ambiente de desenvolvimento use `localstorage` (todos os comentários no `.env.mongo.example` explicam tudo.)
  - Para ambiente de produção e para rodar no docker, use no nome do serviço: `mongo`
- Caso já tenha instalado o docker e queira instalar somente o MongoDB localmente, execute o comando:

```bash
docker compose up -d mongo
```

- Em ambientes Linux execute como super usuário `sudo`

```bash
sudo docker compose up -d mongo
```

- Verifique se o serviço está sendo executado corretamente com (execute como super usuário, caso use Linux):

Windows:

```bash
docker ps -a
```

Linux:

```bash
sudo docker ps -a
```

Agora pronto para ser utilizado pelos nossos serviços Backend(NestJS) para receber os dados do Worker(GO).

---

# Como executar o servidor NestJS

<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/3/37/NestJS-logo-wordmark.svg" alt="MongoDB logo" width="400" />
</div>

Serviços a serem instalados:

- [NestJS](https://docs.nestjs.com/first-steps)
- [NodeJS](https://nodejs.org/en/download)
- Gerenciador de pacotes:

  - O projeto utilizou `pnpm`, mas você pode executar com `npm` ou `yarn` se preferir. Somente lembre-se de excluir os arquivos `backend/pnpm-lock.yaml` e `backend/pnpm-workspace.yaml`.
  - Instale [pnpm](https://pnpm.io/installation)
  - Instale [npm](https://nodejs.org/en/download): Ao instalar o Node ele já vem com o npm integrado.
  - Instale [yarn](https://chore-update--yarnpkg.netlify.app/pt-BR/docs/install)

- Vá para o local do arquivo em `gdash/backend`
- CONFIGURE TODAS AS VARIÁVEIS AMBIENTES:

  - Crie um arquivo `.env` dentro da pasta do serviço, em `gdash/backend`, seguindo os exemplos no arquivo `.env.example`
  - Para ambiente de desenvolvimento use `localstorage` (todos os comentários no `.env.example` explicam tudo.)
  - Para ambiente de produção e para rodar no docker, use no nome do serviço, como `mongo`
  - Caso queira experimentar a integração com a IA acesse o site do [Google AI Studo](https://aistudio.google.com/welcome?utm_source=google&utm_medium=cpc&utm_campaign=FY25-global-DR-gsem-BKWS-1710442&utm_content=text-ad-none-any-DEV_c-CRE_726176677169-ADGP_Hybrid%20%7C%20BKWS%20-%20EXA%20%7C%20Txt-AI%20Studio-AI%20Studio-KWID_1276544732073-kwd-1276544732073&utm_term=KW_google%20ai%20studio-ST_google%20ai%20studio&gclsrc=aw.ds&gad_source=1&gad_campaignid=21030196513&gbraid=0AAAAACn9t651f_zc6giEDN2iGTQE88-SI&gclid=Cj0KCQiArt_JBhCTARIsADQZaykYFZrwnCAYsUHOUFmwNtNiP98Eegohj-xc_aWzsLjTPH1BxHy4XE8aAhBgEALw_wcB) e solicite sua chave de API
    - A Google API fornece uma margem com folga de requisições à API de forma gratuita por dia e um limite de solicitações por minuto. Então só ficar atento a isso, mas não se preocupe, eles não irão te cobrar nada a não ser que você configure um plano além do gratuito, que já é definido por padrão. Caso vocÊ acesse o limite de requisições por minuto ou por dia, você só receberá uma notificação e o insight da API retornara `null`.

- Instale as dependencias, de acordo com seu gerenciador de pacotes com:

```bash
pnpm install
yarn install
npm install
```

- Com o MongoDB em execução (requisito, caso contário o servidor Nest não executará), inicie o servidor com:

```bash
pnpm start:dev
yarn start:dev
npm run start:dev
```

Quando iniciar o projeto você verá vários logs, dentre eles:

```bash
[Nest] LOG [NestApplication] Nest application successfully started +3ms
[Nest] LOG [Main] Server running on http://localhost:3333
[Nest] LOG [Swagger] Swagger docs available on http://localhost:3333/docs
```

> Caso queira ver a documentação da API no Swagger, ao incializar o servidor, acesse o link:
> http://localhost:3333/docs

---

# Como executar o serviço React + Vite localmente

<div align="center" style="display: flex; justify-content: center; gap: 50px; padding-bottom: 20px">
  <img alt="Vite logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/1200px-Vitejs-logo.svg.png", width="150">
  <img alt="React logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/960px-React-icon.svg.png", width="150">
  <img alt="Vite logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png", width="150">
</div>

- Com o instalador de pacotes configurado, vá para a pasta do projeto em `frontend`:

```bash
cd frontend
```

- Instale os pacotes necessários

```bash
pnpm install
yarn install
npm install
```

- CONFIGURE TODAS AS VARIÁVEIS AMBIENTES:

  - Crie um arquivo `.env` dentro da pasta do serviço, em `gdash/frontend`, seguindo os exemplos no arquivo `.env.example`
  - Para ambiente de desenvolvimento use `localstorage` (todos os comentários no `.env.example` explicam tudo.)
  - Para ambiente de produção e para rodar no docker, use no nome do serviço, como `nestapi`

- Execute o projeto com:

```bash
pnpm dev
yarn dev
npm run dev
```
