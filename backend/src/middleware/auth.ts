import {Request,Response,NextFunction} from 'express'; import jwt from 'jsonwebtoken'; import {Role} from '@prisma/client';
export type AuthRequest=Request&{user?:{id:string,role:Role}};
export function auth(req:AuthRequest,res:Response,next:NextFunction){const token=req.headers.authorization?.replace('Bearer ',''); if(!token)return res.status(401).json({message:'Token não informado'}); try{req.user=jwt.verify(token,process.env.JWT_SECRET||'secret') as any; next()}catch{return res.status(401).json({message:'Token inválido'})}}
export const roles=(...allowed:Role[])=> (req:AuthRequest,res:Response,next:NextFunction)=>{if(!req.user||!allowed.includes(req.user.role))return res.status(403).json({message:'Acesso não permitido'});next()};
