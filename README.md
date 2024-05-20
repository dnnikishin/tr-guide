# Travel service. Backend server.

## Resources
| Resource | Link |
| ------ | ----------- |
| Repository | https://bitbucket.org/citronium/travel-guide2-backend |

##Global settings: 
```
typescript      - language 
nodejs          - >= 8.10.0
typescipt       - >= 3.4.3
nestjs          - >= 6.4.0
```

## Environments
| Environment	| Version |
|---	|---	|
| Node.js | \> 8.10.0 |
| TypeScript | \> 3.4.3 |
| nestjs | \> 6.5.0 |
| PostgreSQL | 11.6 |

##Database and Migrations
You can create database with command
`docker-compose -f docker-compose.development.yaml up -d postgres`

TypeORM is used to work with migrations (https://typeorm.io/#/migrations). Migrations are stored to the folder ./src/infrastructure/database/migrations. 
New migration can be created with command:
`yarn typeorm migration:create -n new_migration_name --dir ./src/infrastructure/database/migrations`
When application run new migrations should be applied automatically.

#### Run application
` yarn start:dev`

## Used dependencies
| libs	| Description |
|---	|---	|
| dotenv | easy environment storing |
| pg | postrgresql |
| typeorm | orm for sql database |

#####You can create modules files with command line. You need to install globally npm package:
* cmd: `npm install -g @nestjs/cli`

#####After that, you can use nest commands. See below. Nest CLI commands must start with:
```
nest generate [command] file-name path
generate (alias: g)
```
#### CLI commands: 
```
class (alias: cl)
controller (alias: co)
decorator (alias: d)
filter (alias: f)
gateway (alias: ga)
guard (alias: gu)
interface (alias: -)
interceptor (alias: in)
library (alias: lib)
middleware (alias: mi)
module (alias: mo)
pipe (alias: pi)
provider (alias: pr)
resolver (alias: r)
service (alias: s)
```

## TypeOrm default settings
1. columnOptions  
```
nullable   - false
```

## API for offline client
### Route
```
GET /data?lastUpdate=timestamp
```
### Result data
```json
{
  "lastUpdate": timestamp,
  "places": [
    {
      "id": integer,    
      "address": string | null,
      "altitude": double,      
      "categoriesIds": [integer],
      "updated": Date,
      "created": Date,
      "deleted": Date | null,
      "description": string | null,
      "email": string | null,
      "filesIds": [integer],
      "files": [
        {
          "id": integer,
          "created": Date,
          "updated": Date,
          "deleted": Date,
          "mimetype": "string",
          "url": {
            "original": "string",
            "thumb": "string"
          },
          "size": {
            "original": integer,
            "thumb": integer
          },
          "type": enum('image', 'video', 'audio', 'historical_photo', '3d_model', 'recognition_image', '360_degree_photo', 'others'),
          "width": integer,
          "device": enum('ios', 'android', 'all')
        }
      ],
      "lat": double | null,
      "lng": double | null,
      "name": string,
      "phones": [
        {
          "label": string,
          "value": string,
        }
      ] | null,
      "price": string | null,
      "schedule": {
        "lunchStart": string,
        "lunchEnd": string,
        "withoutLunch": boolean,
        "monday": {
          "start": string,
          "end": string,
          "text": string,
          "dayOff": boolean,
          "aroundTheClock": boolean,
        }
      } | null, 
      "site": string | null,
      "thumbnailId": integer | null,
      "thumbnail": {
        "id": integer,
        "created": Date,
        "updated": Date,
        "deleted": Date,
        "mimetype": "string",
        "url": {
          "original": "string",
          "thumb": "string"
        },
        "size": {
          "original": integer,
          "thumb": integer
        },
        "type": enum('image', 'video', 'audio', 'historical_photo', '3d_model', 'recognition_image', '360_degree_photo', 'others'),
        "width": integer,
        "device": enum('ios', 'android', 'all')
      }
    }
  ],
  "routes": [
    {
      "id": integer,
      "categoriesIds": [integer],
      "updated": Date,
      "created": Date,
      "deleted": Date | null,
      "description": string | null,
      "distance": integer | null,
      "name": string,
      "placesInRoute": [
        {
          "id": integer,
          "description": string | null, 
          "order": integer, 
          "updated": Date,
          "created": Date,
          "deleted": Date | null,
          "time": integer,
          "placeId": integer,
          "routeId": integer,    
        }
      ],
      "thumbnailId": integer | null,
      "type": enum(['prepared', 'thematic']) | null,
    }
  ],
  "files": [
    {
      "id": integer,
      "type": enum('image', 'video', 'audio', 'historical_photo', '3d_model', 'recognition_image', '360_degree_photo', 'others'),
      "url": {
          "original": string,
          "thumb": string | null
      },
      "size": {
        "original": integer,
        "thumb": integer | null
      },
      "mimetype": "string",
      "updated": Date,
      "created": Date,
      "deleted": Date | null,
      "width": integer,
      "device": enum('ios', 'android', 'all')
    }
  ],
  "categories": [
    {
      "id": integer,
      "name": string,
      "updated": Date,
      "created": Date,
      "deleted": Date | null       
    }
  ],
  "irs": [
    {
      "id": integer,
      "name": "string",
      "recognitionImageId": integer,
      "recognitionImage": {
        "id": integer,
        "created": Date,
        "updated": Date,
        "deleted": Date | null,
        "mimetype": "string",
        "url": {
          "original": "string",
          "thumb": "string"
        },
        "size": {
          "original": integer,
          "thumb": integer
        },
        "type": "recognition_image",
        "width": integer,
        "device": enum('ios', 'android', 'all')
      },
      "iosObjectId": integer,
      "iosObject": {
        "id": integer,
        "created": Date,
        "updated": Date,
        "deleted": Date | null,
        "mimetype": "string",
        "url": {
          "original": "string",
          "thumb": "string"
        },
        "size": {
          "original": integer,
          "thumb": integer
        },
        "type": enum('image', 'video', 'audio', 'historical_photo', '3d_model', 'recognition_image', '360_degree_photo', 'others'),
        "width": integer,
        "device": enum('ios', 'all')
      },
      "androidObjectId": integer,
      "androidObject": {
        "id": integer,
        "created": Date,
        "updated": Date,
        "deleted": Date | null,
        "mimetype": "string",
        "url": {
          "original": "string",
          "thumb": "string"
        },
        "size": {
          "original": integer,
          "thumb": integer
        },
        "type": enum('image', 'video', 'audio', 'historical_photo', '3d_model', 'recognition_image', '360_degree_photo', 'others'),
        "width": integer,
        "device": enum('android', 'all')
      },
      "created": Date,
      "updated": Date,
      "deleted": Date | null
    }
  ]    
}
```