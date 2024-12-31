import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import z from 'zod';
import bcrypt from 'bcrypt';

dotenv.config();

const PORT: string | undefined = process.env.PORT;
const MONGO_URL: string | undefined = process.env.MONGO_URL;
const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
const JWT_EXPIRY: string | undefined = process.env.JWT_EXPIRY;

export { 
  express,
  bodyParser,
  jwt,
  z,
  PORT,
  MONGO_URL,
  mongoose,
  bcrypt,
  JWT_SECRET,
  JWT_EXPIRY
};