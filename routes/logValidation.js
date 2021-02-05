import Joi from '@hapi/joi';

const logValidation = (data) => {

    const logSche = Joi.object({
            nik: Joi.string().min(6).max(25).required(),
            pin: Joi.string().min(6).max(32).required(),
        _social:{
            _email: Joi.string().email().optional(),           
            _mobile: Joi.number().min(7).optional(),
            _ether: Joi.string().min(42).max(42).optional()
        }
    }).options({abortEarly: false});

    return logSche.validate(data);
};

export default logValidation;