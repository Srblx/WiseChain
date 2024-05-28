import { PrismaClient } from "@prisma/client";

// Prisma client 
export const prisma = new PrismaClient();

// JWT
export const JWT_SECRET = process.env.JWT_SECRET;

// JWT EXPIRES IN
export const JWT_EXPIRES_IN_5_DAYS = '5d';

// Required fields for signup
export const REQUIRED_FIELDS = [
    'firstname',
    'lastname',
    'pseudo',
    'mail',
    'password',
    'dateOfBirth',
    'is_revoice',
  ];

// Google ID and Secret


export const SALT_ROUNDS = 10;