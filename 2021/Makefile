NODE_VERSION=17.2.0
ccend=$(shell tput sgr0)
ccgreen=$(shell tput setaf 2)
ccso=$(shell tput smso)

just-run:
	@echo "$(ccso)--> Running all solutions $(ccend)"
	bash -l -c 'nvm use && ./scripts/run-solutions.sh'
	@echo "$(ccgreen)All done!$(ccend)"

run: setup-node just-run

setup-node:
	@echo "$(ccso)--> Checking for nvm $(ccend)"
	@bash -l -c 'command -v nvm' > /dev/null
	@echo "$(ccso)--> Installing $(NODE_VERSION) $(ccend)"
	bash -l -c 'nvm install $(NODE_VERSION) && echo "${NODE_VERSION}" > ./.nvmrc'
	@echo "$(ccgreen)Successfully installed node v${NODE_VERSION}.$(ccend)"
