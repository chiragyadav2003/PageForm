"use server"

import { currentUser } from "@clerk/nextjs"
import prisma from "@/db/prisma"
import { formSchema, formSchemaType } from "@/schema/form";


//NOTE - define error for "User Not Found"
class UserNotFoundErr extends Error {
    constructor(message?: string, statusCode: number = 404) {
        super(message || "User not found");
        this.statusCode = statusCode;
    }
    statusCode: number
}

export async function GetFormStats() {
    const user = await currentUser()

    if (!user) {
        throw new UserNotFoundErr("user not exist");
    }

    const stats = await prisma.form.aggregate({
        where: {
            userId: user.id
        },
        _sum: {
            visits: true,
            submissions: true
        }
    })

    const visits = stats._sum.visits || 0;
    const submissions = stats._sum.submissions || 0;

    let submissionRate = 0;
    if (visits > 0) {
        submissionRate = (submissions / visits) * 100
    }

    const bounceRate = 100 - submissionRate;

    return {
        visits,
        submissions,
        submissionRate,
        bounceRate
    }
}




export async function CreateFormData(data: formSchemaType) {
    //NOTE - validate received data, now api will be able to handle data as per form schema
    const validation = formSchema.safeParse(data)
    if (!validation.success) {
        throw new Error("form not valid")
    }

    const user = await currentUser()

    if (!user) {
        throw new UserNotFoundErr("user not exist");
    }

    const { name, description } = data;

    const form = await prisma.form.create({
        data: {
            userId: user.id,
            name,
            description
        }
    })

    if (!form) {
        throw new Error("Something went wrong")
    }

    return form.id;
}



export async function GetForms() {
    const user = await currentUser()

    if (!user) {
        throw new UserNotFoundErr("user not exist");
    }

    return await prisma.form.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: "desc"
        }
    })

}