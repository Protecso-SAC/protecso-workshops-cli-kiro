IMAGE := biblioteca-practica
RUN   := docker run --rm -v "$(CURDIR)":/app -w /app $(IMAGE)

.PHONY: help docker-up build test run shell

help: ## Lista los comandos disponibles
	@grep -E '^[a-z-]+:.*##' $(MAKEFILE_LIST) | awk 'BEGIN{FS=":.*## "}{printf "  make %-10s %s\n", $$1, $$2}'

docker-up: ## Verifica que Docker responda (arranca Colima si hace falta)
	@bash bin/ensure-docker.sh

build: docker-up ## Construye la imagen de práctica
	docker build -t $(IMAGE) .

test: build ## Corre las pruebas dentro del contenedor
	$(RUN) npm test

run: build ## Ejecuta la CLI: make run ARGS="list"
	$(RUN) node src/index.js $(ARGS)

shell: build ## Abre una terminal dentro del contenedor
	docker run --rm -it -v "$(CURDIR)":/app -w /app $(IMAGE) bash
