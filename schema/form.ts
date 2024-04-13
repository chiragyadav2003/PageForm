import * as z from "zod";

export const formSchema = z.object({
    name: z.string().min(4),
    description: z.string().optional()
})

//NOTE : declare form using type inference
export type formSchemaType = z.infer<typeof formSchema>