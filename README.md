# Movie Service API

This REST API is built with TypeScript, Express, Prisma, and SQLite. It is built around a database containing movie data and a database for the ratings for the movies. It supports pagination, filtering by year or genre, chronological sorting, and movie details with ratings.

## Run locally

Requirements:

- Node.js 20+
- npm

Clone the repository and install dependencies:

```bash
git clone https://github.com/khancepts101/movie-service-api.git
cd movie-service-api/movieservice
npm install
```

Create the local environment file:

```bash
cp .env.example .env
```

Start the API:

```bash
npm run dev
```

The service runs at `http://localhost:3000` by default.

## Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/movies` | List movies, 50 per page |
| GET | `/movies?page=2` | Select a page |
| GET | `/movies?year=1995` | Filter by release year, ascending by default |
| GET | `/movies?year=1995&order=desc` | Filter by year in descending order |
| GET | `/movies?genre=Comedy` | Filter by genre |
| GET | `/movies/2` | Get details for a movie |


### List movies

```bash
curl -sS 'http://localhost:3000/movies' 
```

```json
{
  "data": [
    {
      "imdbId": "tt0094675",
      "title": "Ariel",
      "genres": ["Drama", "Crime"],
      "releaseDate": "1988-10-21",
      "budget": "$0.00"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 50,
    "total": 45430,
    "totalPages": 909
  }
}
```

### List movies on page 2

```bash
curl -sS 'http://localhost:3000/movies?page=2' 
```

```json
{
  "data": [
    {
      "imdbId": "tt0430051",
      "title": "The Elementary Particles",
      "genres": ["Drama", "Romance"],
      "releaseDate": "2006-02-10",
      "budget": "$6000000.00"
    }
  ],
  "pagination": {
    "page": 2,
    "pageSize": 50,
    "total": 45430,
    "totalPages": 909
  }
}
```

### List movies by year

```bash
curl -sS 'http://localhost:3000/movies?year=1995' 
```

```json
{
  "data": [
    {
      "imdbId": "tt0226168",
      "title": "Multi-Facial",
      "genres": ["Drama"],
      "releaseDate": "1995-01-01",
      "budget": "$3000.00"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 50,
    "total": 598,
    "totalPages": 12
  }
}
```

### List movies by year in descending order

```bash
curl -sS 'http://localhost:3000/movies?year=1995&order=desc' 
```

```json
{
  "data": [
    {
      "imdbId": "tt0114746",
      "title": "Twelve Monkeys",
      "genres": ["Science Fiction", "Thriller", "Mystery"],
      "releaseDate": "1995-12-29",
      "budget": "$29500000.00"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 50,
    "total": 598,
    "totalPages": 12
  }
}
```

### List movies by genre

```bash
curl -sS 'http://localhost:3000/movies?genre=Comedy'
```

```json
{
  "data": [
    {
      "imdbId": "tt0092149",
      "title": "Shadows in Paradise",
      "genres": ["Drama", "Comedy"],
      "releaseDate": "1986-10-16",
      "budget": "$0.00"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 50,
    "total": 13176,
    "totalPages": 264
  }
}
```

### Get movie details

```bash
curl -sS 'http://localhost:3000/movies/2' 
```

```json
{
  "data": {
    "imdbId": "tt0094675",
    "title": "Ariel",
    "description": "Taisto Kasurinen is a Finnish coal miner whose father has just committed suicide and who is framed for a crime he did not commit. In jail, he starts to dream about leaving the country and starting a new life. He escapes from prison but things don't go as planned...",
    "releaseDate": "1988-10-21",
    "budget": "$0.00",
    "runtime": 69,
    "averageRating": 3.4,
    "genres": ["Drama", "Crime"],
    "originalLanguage": null,
    "productionCompanies": [
      "Villealfa Filmproduction Oy",
      "Finnish Film Foundation"
    ]
  }
}
```


## Tests

```bash
npm test
```

## API documentation

- Import [`docs/movie-service.postman_collection.json`](docs/movie-service.postman_collection.json) into Postman.
