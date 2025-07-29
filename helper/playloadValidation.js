import { Joi, Segments } from 'celebrate';

export const payloadValidation = {
  commonPayload: {
    [Segments.BODY]: Joi.object().keys({
      encryptedData: Joi.string().required(),
      iv: Joi.required(),
    }),
  },
};