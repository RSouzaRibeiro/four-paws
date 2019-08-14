'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BreedSchema extends Schema {
  up() {
    this.create('breeds', (table) => {    
      table.increments()  
         
      table.string('breedname').notNullable().unique()
      table.string('postage').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('breeds')
  }
}

module.exports = BreedSchema
