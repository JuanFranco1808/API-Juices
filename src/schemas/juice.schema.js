const Joi = require('joi');

const id = Joi.number()
const juiceName = Joi.string().min(5).max(255)
const juiceSize = Joi.string().min(5).max(255)
const juiceFruit = Joi.string().min(4).max(255)
const juiceDescription = Joi.string().min(5).max(100)
const juicePrice = Joi.number()

const createSchema = Joi.object({
    juiceName: juiceName.required(),
    juiceSize: juiceSize.required(),
    juiceFruit: juiceFruit.required(),
    juiceDescription: juiceDescription.required(),
    juicePrice: juicePrice.required()
});

const updateSchema = Joi.object({
    juiceName: juiceName.optional(),
    juiceSize: juiceSize.optional(),
    juiceFruit: juiceFruit.optional(),
    juiceDescription: juiceDescription.optional(),
    juicePrice: juicePrice.optional()
});

const getSchema = Joi.object({
    id: id.required()
});

module.exports = {
    createSchema,
    updateSchema,
    getSchema
}