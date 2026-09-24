import {z} from 'zod';
export const login=z.object({email:z.string().email(),password:z.string().min(6)});
export const userCreate=z.object({name:z.string().min(2),email:z.string().email(),phone:z.string().optional(),password:z.string().min(6).optional()});
export const serviceSchema=z.object({name:z.string().min(2),description:z.string().optional(),price:z.coerce.number().positive()});
export const ticketSchema=z.object({title:z.string().min(2),description:z.string().min(5),technicianId:z.string().min(1),serviceId:z.string().min(1)});
