import Joi from '@hapi/joi';

const regValidation = (data) => {

    const regSche = Joi.object({
        name: Joi.string().min(3).max(25).required(),
        lname: Joi.string().min(3).max(25).required(),
        age: Joi.number().min(2).required(),
        
            nik: Joi.string().min(6).max(25).required(),
            pin: Joi.string().min(6).max(32).required(),
            _ehash: Joi.string().optional(),
            _mhash: Joi.string().optional(),
        _social:{
            _email: Joi.string().email().optional(),
            
            _mobile: Joi.number().min(7).optional(),
            _ether: Joi.string().min(42).max(42).optional()
        }
    }).options({abortEarly: false});

    return regSche.validate(data);
};

export default regValidation;