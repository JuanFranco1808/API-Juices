const Joi = require('joi');

const id = Joi.number()
const userName = Joi.string().min(5).max(255)
const userEmail = Joi.string().min(5).max(255)
const userPassword = Joi.string().min(5).max(255)

const createSchema = Joi.object({
    userName: userName.required(),
    userEmail: userEmail.required(),
    userPassword: userPassword.required(),
});

const updateSchema = Joi.object({
    userName: userName.optional(),
    userEmail: userEmail.optional(),
    userPassword: userPassword.optional(),
});

const getSchema = Joi.object({
    id: id.required()
});

module.exports = {
    createSchema,
    updateSchema,
    getSchema
}