'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlertPetLostSchema extends Schema {
  up() {
    this.create('alert_pet_losts', (table) => {
      table.increments()
      table.integer('pet_id')
        .unsigned()
        .references('id')
        .inTable('pets')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()

      table.decimal('latitude', 9, 6).notNullable()
      table.decimal('longitude', 9, 6).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('alert_pet_losts')
  }
}

module.exports = AlertPetLostSchema
