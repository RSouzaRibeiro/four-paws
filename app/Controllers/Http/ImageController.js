'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Pet = use('App/Models/Pet')
const Image = use('App/Models/Image')
const Helpers = use('Helpers')

class ImageController {
  async store ({ params, request }) {
    const pet = await Pet.findOrFail(params.id)
  
    const images = request.file('image', {
      types: ['image'],
      size: '2mb'
    })
  
    await images.moveAll(Helpers.tmpPath('uploads'), file => ({
      name: `${Date.now()}-${file.clientName}`
    }))
  
    if (!images.movedAll()) {
      return images.errors()
    }
  
    await Promise.all(
      images
        .movedList()
        .map(image => pet.images().create({ path: image.fileName }))
    )
  }

  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }
}

module.exports = ImageController
