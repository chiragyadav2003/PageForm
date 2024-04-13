"use server"

import { currentUser } from "@clerk/nextjs"
import prisma from "@/db/prisma"


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