load_envs:=. ./.env

all: check init up done

.PHONY: check
check:
	@command -v npm >/dev/null || ( echo "npm is not installed"; exit 1 )
	@command docker info >/dev/null || ( echo "docker is not installed or is not running"; exit 1 )

.PHONY: init
init:
	@echo "Installing Dependencies"
	@command npm i
	@command npm i -g knex
	@command npm i -g backpack-core

down:
	@command docker stop postgres_dev>/dev/null && echo "Stopped container instance"
	@command docker container rm postgres_dev>/dev/null && echo "Removed docker container"

up:
	@echo "Starting docker container"
	@command docker run --name postgres_dev -d -p 5432:5432 -e POSTGRES_HOST_AUTH_METHOD=trust postgres>/dev/null
	@while ! docker ps|grep postgres_dev >/dev/null;do echo -n .; done
	@sleep 2
	@echo "Running database migrations"
	@command npm run migrate

.PHONY: done
done:
	@echo
	@printf "=%.0s" {1..80}
	@echo
	@echo
	@printf "\e[93mThe setup is complete!\e[0m\n"
	@echo
	@${load_envs} && printf "\e[92mCongratulations!\e[0m You should be able to start the project with `npm start` now \n"

.PHONY: reset
reset:
	@rm -rf build
	@rm -rf coverage
	@rm -rf .env