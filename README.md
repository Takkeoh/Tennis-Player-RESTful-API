# Tennis Player API

This project is a simple RESTful API

## Installation

This project uses npm to compile. From the root of the repository

```bash
npm install
```

## Usage

To run the server, simply use
```sh
npm start
```

To run the test suite, if the server is running, use
```sh
npm test
```
To run the test suite, if the server is not running, use
```sh
npm start && npm test
```

## Endpoints

This API exposes several endpoints. I recommend using [swagger](https://editor.swagger.io/#) with the provided `swagger.yml` to view them properly.

The exposed end points are as follows
```
GET /players
```
```
GET /players/{playerId}
```
```
POST /players
```
```
PATCH /players/{playerId}
```
```
DELETE /players/{playerId}
```
```
GET /stats
```

## Troubleshooting

Node might give an error on installation of sqlite3. To fix this issue simply update your version of node to the latest
```sh
npm install -g n && sudo n latest
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.