default:
  just --list

# Enables corepack in node
corepack-enable:
    ./nvm_exec.sh corepack enable

# Installs project package.json dependencies
install-deps:
    ./nvm_exec.sh pnpm install

# Starts Next development server
dev:
    ./nvm_exec.sh pnpm dev
# Builds Next application
build:
    ./nvm_exec.sh pnpm build

# Starts Next server for built application
start:
    ./nvm_exec.sh pnpm start

fix:
    ./nvm_exec.sh pnpm lint
    ./nvm_exec.sh pnpm prettier-fix

# Generate inversify bindings
ioc-generate:
    ./nvm_exec.sh pnpm ioc-generate

# Generate inversify bindings (watch execution)
ioc-generate-watch:
    ./nvm_exec.sh pnpm ioc-generate --watch

# Commit
commit:
    ./nvm_exec.sh pnpm commit

# Proxy comand through nvm
nvm-exec command:
    ./nvm_exec.sh {{command}}