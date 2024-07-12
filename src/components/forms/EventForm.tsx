'use client'

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import React, {Dispatch, SetStateAction} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {Checkbox} from "@/components/ui/checkbox";
import {Textarea} from "@/components/ui/textarea";
import {createEvent} from "@/lib/Actions/CalendarActions";
import {toast} from "sonner";
import {useQueryClient} from "react-query";

const formSchema = z.object({
    date: z.date({
        required_error: "Date of the event is required"
    }),
    title: z.string().min(1, "Title cannot be empty").max(100, "Title cannot exceed 100 characters"),
    description: z.string().optional(),
    time: z.string(),
    isImportant: z.boolean().default(false)
})

export type createEventForm = z.infer<typeof formSchema>;

export type Props = {
    showCard: Dispatch<SetStateAction<boolean>>,
}

const EventForm = ({showCard} : Props) => {

    const form = useForm<createEventForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            time: "",
            date: new Date(),
            isImportant: false,
        }
    })

    const queryClient = useQueryClient();

    const handleSubmit = async (data: createEventForm) => {
        const result = await createEvent(data);

        if(result){
            queryClient.invalidateQueries("fetchCalendar");
            toast.success("Succesfully created Event");
        }else{
            toast.error("Something went wrong");
        }

        showCard(false);
    }

    return (
        <Form {...form}>
            <form
                className="flex flex-col"
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <FormField
                    control = {form.control}
                    name="title"
                    render = {({field}) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Event title..." {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control = {form.control}
                    name="description"
                    render = {({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Event description..."
                                    {...field}
                                    className="w-full h-[200px] resize-none"

                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="grid grid-rows-2 md:grid-cols-2 gap-4 pt-5">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col pt-2.5">
                                <FormLabel>Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "pl-3 text-left font-normal bg-primary",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={new Date()}
                                            onSelect={field.onChange}
                                            disabled={(date : Date) =>
                                                date <= new Date()
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control = {form.control}
                        name="time"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Time</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control = {form.control}
                    name="isImportant"
                    render = {({field}) => (
                        <FormItem>
                            <div className="pt-5 flex flex-row gap-5">
                                <FormControl>
                                    <Checkbox
                                        className="border-secondary bg-background"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>Importance</FormLabel>
                            </div>
                            <FormDescription className="pb-5">
                                Check if your event is more important than others
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" variant="secondary" className="font-semibold w-[50%]">
                    Submit
                </Button>
            </form>
        </Form>
    )
}

export default EventForm;