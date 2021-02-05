import jwt from 'jsonwebtoken';

const verify = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send("Access denied");
    try{
        const verified = jwt.verify(token,process.env.SAFE_CRYPTR,{expiresIn: "30 m"});
        req.client = verified;
        next();
    }catch(err){
        res.status(400).send("Invalid token");
    }
}

export default verify;