"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect } from 'react'

function ErrorPage({ error }: { error: Error }) {
    useEffect(() => {
        console.error("Error - ", error)
    }, [error])
    return (
        <div className='flex flex-col w-full h-full justify-center items-center'>
            <h2 className=' text-destructive text-4xl font-semibold animate-pulse gap-4 mb-4 '>Something went wrong</h2>
            <Button asChild>
                <Link href={"/"}>Go back to home</Link>
            </Button>
        </div>
    )
}

export default ErrorPage