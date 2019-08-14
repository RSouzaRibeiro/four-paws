'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class Pet extends Model {

  static scopeNearBy(query, latitude, longitude, distance) {
    const haversine = `(6371 * acos(cos(radians(${latitude}))
      * cos(radians(latitude))
      * cos(radians(longitude)
      - radians(${longitude}))
      + sin(radians(${latitude}))
      * sin(radians(latitude))))`


    return query
      .select('*', Database.raw(`round(${haversine}) as distance`))
      .whereRaw(`${haversine} < ${distance}`)
  }

  breeds() {
    return this.belongsTo('App/Models/Breed')
  }

  images() {
    return this.hasMany('App/Models/Image')
  }

}

module.exports = Pet
