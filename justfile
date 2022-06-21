default:
  just --list

# Starts Next development server
start:
    docker compose -f ./docker-compose.dev.yml up

# Rebuilds docker image and starts Next server
start-and-rebuild:
    docker compose -f ./docker-compose.dev.yml up --build

# Downloads schema and generates corresponding ts types
graphql-codegen:
    docker compose -f ./docker-compose.dev.yml up --no-recreate -d
    docker compose -f ./docker-compose.dev.yml exec next_base yarn graphql

# Install package
install package:
    docker compose -f ./docker-compose.dev.yml up --no-recreate -d
    docker compose -f ./docker-compose.dev.yml exec next_base yarn add "{{package}}"

# Install dev package
install-dev package:
    docker compose -f ./docker-compose.dev.yml up --no-recreate -d
    docker compose -f ./docker-compose.dev.yml exec next_base yarn add -D "{{package}}"

# Remove package
remove package:
    docker compose -f ./docker-compose.dev.yml up --no-recreate -d
    docker compose -f ./docker-compose.dev.yml exec next_base yarn remove "{{package}}"