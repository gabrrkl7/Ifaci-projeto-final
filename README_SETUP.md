# Interface Industrial CRUD - Guia de Inicialização

## Pré-requisitos

- Docker e Docker Compose instalados
- Node.js 18+ instalado
- .NET 8 SDK (opcional, para desenvolvimento local)

## Estrutura do Projeto

- **Backend**: ASP.NET Core 8 em `InterfaceIndustrialApi/`
- **Frontend**: Next.js em `interface-industrial-frontend/`
- **Database**: PostgreSQL rodando em Docker

## Como Iniciar o Projeto

### 1. Iniciar Backend + Database com Docker

```bash
cd InterfaceIndustrialApi
docker-compose up --build
```

Isso vai:
- Criar um container do PostgreSQL na porta 5432
- Compilar e rodar o backend .NET na porta 5071
- Configurar automaticamente o banco de dados

**Aguarde até ver mensagens como:**
```
backend | info: Microsoft.AspNetCore.Hosting.Diagnostics
backend | info: Now listening on: http://+:5071
```

### 2. Iniciar Frontend (em outro terminal)

```bash
cd interface-industrial-frontend
npm install  # apenas na primeira vez
npm run dev
```

O frontend estará disponível em: **http://localhost:3000**

### 3. Verificar Conexão

- Acesse o Swagger da API: **http://localhost:5071/swagger**
- Tente acessar a página inicial do frontend: **http://localhost:3000**

## Variáveis de Ambiente

### Backend (.env)

```bash
ConnectionStrings__DefaultConnection=Host=postgres;Port=5432;Database=usersdb;Username=postgres;Password=postgres
Jwt__Key=N9y1B8TkJDayGmLrBKBDlCYLl4lHzdnk
Jwt__Issuer=UserCrudApi
ASPNETCORE_ENVIRONMENT=Development
ASPNETCORE_URLS=http://+:5071
```

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL=http://localhost:5071
```

## Solução de Problemas

### Erro: Connection Refused na porta 5071

**Causa**: Backend não está rodando

**Solução**:
```bash
cd InterfaceIndustrialApi
docker-compose down  # para tudo
docker-compose up --build  # reinicia tudo
```

### Erro: Database Connection Failed

**Causa**: PostgreSQL não está pronto

**Solução**: Aguarde 10 segundos e tente novamente. O healthcheck garante que o banco está pronto antes do backend iniciar.

### Erro: Port Already in Use

```bash
# Ver qual processo está usando a porta
lsof -i :5071

# Parar tudo
docker-compose down
```

### Limpar Tudo e Recomeçar

```bash
# Parar containers
docker-compose down

# Remover volumes (database)
docker-compose down -v

# Reconstruir tudo
docker-compose up --build
```

## API Endpoints Disponíveis

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Fazer login

### Dispositivos
- `GET /api/Devices` - Listar todos
- `GET /api/Devices/{id}` - Obter por ID
- `POST /api/Devices` - Criar novo
- `PUT /api/Devices/{id}` - Atualizar
- `DELETE /api/Devices/{id}` - Deletar

### Sensores
- `GET /api/devices/{deviceId}/Sensors` - Listar por dispositivo
- `POST /api/devices/{deviceId}/Sensors` - Criar novo

### Atuadores
- `GET /api/devices/{deviceId}/Actuators` - Listar por dispositivo
- `POST /api/devices/{deviceId}/Actuators` - Criar novo
- `PUT /api/Actuator/{id}` - Atualizar

### Dados de Sensores
- `GET /api/sensors/{sensorId}/SensorData/history` - Histórico de dados
- `POST /api/sensors/{sensorId}/SensorData/data` - Adicionar dados

## Desenvolvimento Local (sem Docker)

### Backend

```bash
cd InterfaceIndustrialApi
dotnet restore
dotnet ef database update  # Aplicar migrations
dotnet run
```

### Frontend

```bash
cd interface-industrial-frontend
npm run dev
```

## Docker Compose Services

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| postgres | 5432 | Database PostgreSQL |
| backend | 5071 | API .NET Core |
| (frontend local) | 3000 | Next.js (não containerizado) |

## Volumes Docker

- `postgres_data` - Armazena dados do banco de dados (persistence)

## Rede Docker

- `app-network` - Rede bridge para comunicação entre containers

---

**Última atualização**: 02 de junho de 2026
