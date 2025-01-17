all: build

docker-clean: docker-stop
	docker ps -a | awk '{print $$1}' | grep -v CONTAINER | xargs docker rm

docker-stop:
	docker ps -a | awk '{print $$1}' | grep -v CONTAINER | xargs docker stop

dev-up:
	docker-compose up

prod-up:
	git pull
	docker pull mojdigitalstudio/digital-hub-be
	docker-compose -f docker-compose-prod.yml up -d

build:
	cd moj-be ; make build
	cd db ; make build