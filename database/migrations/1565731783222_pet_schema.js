'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PetSchema extends Schema {
  up() {
    this.create('pets', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
        table
        .integer('breed_id')
        .unsigned()
        .references('id')
        .inTable('breeds')
        .notNullable()
        
        
      table.boolean('chipped').defaultTo(false)
      table.string('name').notNullable()
      table.string('color').notNullable()
      table.string('genre').notNullable()
      
      table.decimal('latitude', 9, 6).notNullable()
      table.decimal('longitude', 9, 6).notNullable()

      
      table.timestamps()
    })
  }

  down () {
    this.drop('pets')
  }
}

module.exports = PetSchema
