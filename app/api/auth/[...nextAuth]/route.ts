import  {auth} from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js";
import {prismaClient}  from "@prisma/client"

export const { POST, GET } = toNextJsHandler(auth);