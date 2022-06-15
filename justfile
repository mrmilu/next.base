default:
  just --list

# Enables corepack in node
corepack-enable:
    ./nvm_exec.sh corepack enable

# Installs project package.json dependencies
install-deps:
    ./nvm_exec.sh yarn

# Starts Next development server
dev:
    ./nvm_exec.sh yarn dev
# Builds Next application
build:
    ./nvm_exec.sh yarn build

# Starts Next server for built application
start:
    ./nvm_exec.sh yarn start

# Downloads schema and generates corresponding ts types
graphql-codegen:
    ./nvm_exec.sh yarn graphql

# Proxy comand through nvm
nvm-exec command:
    ./nvm_exec.sh {{command}}