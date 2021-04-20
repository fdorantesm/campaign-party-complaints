# Introduction  

## Environments

|Environments|
|-|
|development|
|staging|
|production|

## Docker

### Containers

|Service|Development|Staging|Production|
|-|-|-|-|
|node|*|*|*|
|mongodb|*|*|x|
|s3|*|*|x|  

```bash

yarn docker:${stage}:up -d

```  

```bash

yarn docker:${stage}:down

```

### Development

```bash

yarn docker:dev:logs

```
