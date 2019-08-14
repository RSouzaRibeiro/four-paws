'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pets
 */
const Pet = use("App/Models/Pet")

class PetController {
  /**
   * Show a list of all pets.
   * GET pets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const { latitude, longitude, distance = 10 } = request.all()
    const pets = Pet.query()
      .with('images')
      .nearBy(latitude, longitude, distance)
      .fetch()
    return pets

  }



  /**
   * Create/save a new pet.
   * POST pets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {
    const { id } = auth.user
    const data = request.only(["breed_id", "name", "color", "latitude", "genre", "longitude"])
    const pet = await Pet.create({ ...data, user_id: id })

    return pet
  }

  /**
   * Display a single pet.
   * GET pets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const pet = await Pet.findOrFail(params.id)
    await pet.load('images')
    return pet
  }


  /**
   * Update pet details.
   * PUT or PATCH pets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {

    const pet = await Pet.findOrFail(params.id)
    const data = request.only(["breed_id", "name", "color", "latitude", "genre", "longitude"])
    pet.merge(data)
    await pet.save()
    return pet
  }

  /**
   * Delete a pet with id.
   * DELETE pets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {

    const pet = await Pet.findOrFail(params.id)
    if (pet.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }
    await pet.delete()
  }
}

module.exports = PetController
