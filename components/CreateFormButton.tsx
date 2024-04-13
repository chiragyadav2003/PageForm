"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { formSchema, formSchemaType } from "@/schema/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "./ui/button";
import { CreateFormData } from "@/actions/form";


function CreateFormButton() {
    const { toast } = useToast()

    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema)
    })

    async function onSubmit(values: formSchemaType) {
        try {
            const formId = await CreateFormData(values)
            toast({
                title: "Success",
                description: "Form created succesfully"
            })
            console.log("FORMID", formId)
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong, please try again later",
                variant: "destructive"
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create a new form</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create form </DialogTitle>
                    <DialogDescription>
                        Create a new form to start collection responses
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="enter name ..." {...field} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea rows={5} placeholder="enter description ..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            onClick={form.handleSubmit(onSubmit)}
                            disabled={form.formState.isSubmitting} className="w-full mt-4"
                            type="submit">
                            {!form.formState.isSubmitting && <span>Save</span>}
                            {form.formState.isSubmitting && <ImSpinner2 className="animate-spin" />}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}

export default CreateFormButton