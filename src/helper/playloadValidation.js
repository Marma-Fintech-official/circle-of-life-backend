import { Joi, Segments } from "celebrate";

export const payloadValidation = {
  [Segments.BODY]: Joi.object({
    encryptedData: Joi.string().required(),
    iv: Joi.required(),    // give a type and make required
  }),
};