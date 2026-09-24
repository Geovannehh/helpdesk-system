import {Router} from 'express'; import {prisma} from '../lib/prisma'; import {auth,roles} from '../middleware/auth'; import {Role} from '@prisma/client'; import {serviceSchema} from '../schemas';
const r=Router(); r.get('/',auth,async(req,res)=>res.json(await prisma.service.findMany({orderBy:{name:'asc'}})));
r.post('/',auth,roles(Role.ADMIN),async(req,res)=>{const p=serviceSchema.safeParse(req.body);if(!p.success)return res.status(400).json({message:'Dados inválidos'});res.status(201).json(await prisma.service.create({data:p.data}))});
r.put('/:id',auth,roles(Role.ADMIN),async(req,res)=>{const p=serviceSchema.partial().safeParse(req.body);if(!p.success)return res.status(400).json({message:'Dados inválidos'});res.json(await prisma.service.update({where:{id:req.params.id},data:p.data}))});
r.patch('/:id/deactivate',auth,roles(Role.ADMIN),async(req,res)=>res.json(await prisma.service.update({where:{id:req.params.id},data:{active:false}}))); export default r;
