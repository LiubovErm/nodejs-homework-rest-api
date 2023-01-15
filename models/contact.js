const {Schema, model, SchemaTypes} = require("mongoose");
const Joi = require("Joi");

const { validationError } = require("../helpers");

const contactSchema = new Schema({
    name: {
        type: String,
        unique: [true, "Name must be unique"],
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: [true, 'Set email for contact'],
    },
    phone: {
        type: String,
        unique: [true, "Phone number must be unique"],
        required: [true, 'Set phone number for contact'],
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }
}, { versionKey: false, timestamps: true });

contactSchema.post("save", validationError);

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
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
