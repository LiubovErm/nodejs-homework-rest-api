const {Schema, model} = require("mongoose");
const Joi = require("Joi");

const { validationError } = require("../helpers");

const contactSchema = new Schema({
    name: {
        type: String,
        unique: [true, "Name must be unique"],
        required: [true, 'Missing required name field'],
    },
    email: {
        type: String,
        required: [true, 'Missing required email field'],
    },
    phone: {
        type: String,
        unique: [true, "Phone number must be unique"],
        required: [true, 'Missing required phone field'],
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true });

contactSchema.post("save", validationError);

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().message("missing field favorite"),
});

const schemas = {
    addSchema,
    updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas,
};
