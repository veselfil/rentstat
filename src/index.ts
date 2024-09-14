import fetch from 'node-fetch';
import fs from 'fs';
import sqlite from 'sqlite3'

const dbFilename = "fuck-idealni-najemnik.sqlite"

const baseUrl = "https://www.sreality.cz/api/cs/v2/estates"
const websiteLinkTemplate = "https://www.sreality.cz/detail/pronajem/byt/what/thefuck/{0}";
const estatesPath = "/api/cs/v2/estates";

const dbHandle = new sqlite.Database(dbFilename);

const lookups: { [name: string]: string } = {
    "1kk": "category_sub_cb=2&category_type_cb=2",
    "1+1": "category_sub_cb=3&category_type_cb=2",
    "2kk": "category_sub_cb=4&category_type_cb=2",
    "2+1": "category_sub_cb=5&category_type_cb=2",
    "3kk": "category_sub_cb=6&category_type_cb=2",
    "3+1": "category_sub_cb=7&category_type_cb=2"
}

interface Property {
    name: string
}

interface PropertiesResponse {
    estates: Property[]
}

interface SrealityResponse {
    _embedded: PropertiesResponse
    per_page: number,
    page: number,
    result_size: number
}

function insertIntoDb(db: sqlite.Database, property: Property): void {
    const statement = db.prepare("INSERT INTO (title, sqm, rooms, isKk, lat, long) VALUES (?, ?, ?, ?, ?, ?)");

    statement.run(property.name, )
}

const promises = Object.keys(lookups).map(async key => {
    await fetchAllPages(lookups[key])
});

function formatUrl(params: string): string {
    return `${baseUrl}?${params}`
} 

async function fetchAllPages(queryParam: string) {
    const baseUrl = formatUrl(queryParam);
    const perPage = 50;
    let hasNextPage = true;
    let total = 0;
    let page = 0;
    
    while (hasNextPage) {
        const response = await fetch(baseUrl + `&page=${page}&per_page=${perPage}`);
        const content = await response.json() as SrealityResponse;
        total = content.result_size;

        content._embedded.estates.forEach(async property => {
            await handleProperty(property);
        })

        hasNextPage = (1 + page) * perPage < total;
        page++;
    }
}

async function handleProperty (property: Property) {
    console.log(property.name);
}