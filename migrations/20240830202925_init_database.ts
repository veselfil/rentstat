import type { Knex } from "knex";

const propertiesTable = "properties";
const ratingsTable = "ratings";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(propertiesTable, builder => {
        builder.string("id").notNullable();
        builder.string("title").notNullable();
        builder.integer("sqm").notNullable();
        builder.string("layout").notNullable();
        builder.integer("totalPrice").notNullable();
        builder.integer("rentPrice");
        builder.integer("utilitiesPrice");
        builder.dateTime("crawledAt").notNullable();
        builder.string("originalLink").notNullable();
    })
    .createTable(ratingsTable, builder => {
        builder.string("id").notNullable();
        builder.string("propertyId").notNullable();
        builder.decimal("rating").notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(propertiesTable)
                      .dropTable(ratingsTable);
}