'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AlertPetLost extends Model {
    pets() {
        return this.belongsTo('App/Models/Pet')
      }
}

module.exports = AlertPetLost
