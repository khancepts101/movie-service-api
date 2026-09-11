import { afterAll, describe, expect, it } from "@jest/globals";
import request from "supertest"

import app from "../src/app.js"
import prisma from "../src/database/prisma.js";

describe("GET /movies", () => {

  it("returns the first 50 movies with pagination", async () => {
    const response = await request(app).get("/movies");
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(50);
    expect(response.body.pagination).toMatchObject({
      page: 1,
      pageSize: 50,
    });
    expect(response.body.data[0]).toEqual({
      imdbId: "tt0094675",
      title: "Ariel",
      genres: ["Drama", "Crime"],
      releaseDate: "1988-10-21",
      budget: "$0.00",
    });
  });
  it("returns the second 50 movies with pagination", async () => {
    const response = await request(app).get("/movies?page=2");
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(50);
    expect(response.body.pagination).toMatchObject({
      page: 2,
      pageSize: 50,
    });
    expect(response.body.data[0]).toEqual({
      imdbId: "tt0430051",
      title: "The Elementary Particles",
      genres: ["Drama", "Romance"],
      releaseDate: "2006-02-10",
      budget: "$6000000.00",
    });

  }
  );
  it("returns the details for a movie", async () => {
    const response = await request(app).get("/movies/2");

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual({
      imdbId: "tt0094675",
      title: "Ariel",
      description: expect.any(String),
      releaseDate: "1988-10-21",
      budget: "$0.00",
      runtime: 69,
      averageRating: 3.4,
      genres: ["Drama", "Crime"],
      originalLanguage: null,
      productionCompanies: [
        "Villealfa Filmproduction Oy",
        "Finnish Film Foundation",
      ],
    });
  });
  it("returns movies from a year in ascending date order", async () => {
    const response = await request(app).get("/movies?year=1995");

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data.length).toBeLessThanOrEqual(50);
    expect(response.body.pagination).toMatchObject({
      page: 1,
      pageSize: 50,
    });

    const dates = response.body.data.map(
      (movie: { releaseDate: string }) => movie.releaseDate,
    );

    expect(
      dates.every((date: string) => date.startsWith("1995-")),
    ).toBe(true);

    expect(dates).toEqual([...dates].sort());
  });
  it("returns movies from a year in descending date order", async () => {
    const response = await request(app).get(
      "/movies?year=1995&order=desc",
    );

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);

    const dates = response.body.data.map(
      (movie: { releaseDate: string }) => movie.releaseDate,
    );

    expect(dates).toEqual([...dates].sort().reverse());
  });
  it("returns movies from a genre with pagination", async () => {
    const response = await request(app).get(
      "/movies?genre=Comedy",
    );

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data.length).toBeLessThanOrEqual(50);
    expect(response.body.pagination).toMatchObject({
      page: 1,
      pageSize: 50,
    });

    expect(
      response.body.data.every(
        (movie: { genres: string[] }) =>
          movie.genres.includes("Comedy"),
      ),
    ).toBe(true);
  });
})
