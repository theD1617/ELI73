import jwt from 'jsonwebtoken';

const verify = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send("No Token Access denied");
    try {
        const verified = jwt.verify(token, process.env.SAFE_CRYPTR, { expiresIn: "10h" });
        req.client = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid token Acces denied");
    }
}

export default verify;