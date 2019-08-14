'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with alertpetlosts
 */

 const AlertPetLost = use('App/Models/AlertPetLost')
class AlertPetLostController {
  /**
   * Show a list of all alertpetlosts.
   * GET alertpetlosts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {
    const alert = await AlertPetLost.all()
   
    return alert
  }

  async myAlerts ({ request, response, view, auth }) {
    const { id } = auth.user
    const alert = await AlertPetLost
    .query()
    .where('user_id', '=', id)
    .fetch()
   
    return alert
  }

 

  /**
   * Create/save a new alertpetlost.
   * POST alertpetlosts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {

    const { id } = auth.user
    const data = request.only(["pet_id", "latitude",  "longitude"])
    const alert = await AlertPetLost.create({ ...data, user_id: id })

    return alert
  }

  /**
   * Display a single alertpetlost.
   * GET alertpetlosts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const alert = await AlertPetLost.findOrFail(params.id)
    await alert.load('pet')
    return alert
  }


  /**
   * Update alertpetlost details.
   * PUT or PATCH alertpetlosts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a alertpetlost with id.
   * DELETE alertpetlosts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = AlertPetLostController
