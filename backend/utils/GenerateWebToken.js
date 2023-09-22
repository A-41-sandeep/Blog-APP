import jwt from 'jsonwebtoken';

export const generateToken=(id)=>
{
    return jwt.sign({id},"1wjdwjd",{
        expiresIn:"30d",
    });
};
