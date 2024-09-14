import knex, { Knex } from 'knex';
import config from "../knexfile"

export default function initDatabase(): Knex {
    return knex(config["production"]);
}