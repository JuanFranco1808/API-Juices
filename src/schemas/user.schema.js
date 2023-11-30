const Joi = require('joi');

const id = Joi.number()
const username = Joi.string().min(5).max(255)
const email = Joi.string().min(5).max(255)
const password = Joi.string().min(4).max(255)

const createSchema = Joi.object({
    username: username.required(),
    email: email.required(),
    password: password.required(),
});

const updateSchema = Joi.object({
    username: username.optional(),
    email: email.optional(),
    password: password.optional(),
});

const getSchema = Joi.object({
    id: id.optional()
});

module.exports = {
    createSchema,
    updateSchema,
    getSchema
}