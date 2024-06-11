'use client'

import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import { Search } from "lucide-react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const formSchema = z.object({
    searchQuery: z.string({
        required_error: "Search string is required",
    })
})

export type searchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (data: searchForm) => void;
  placeholder: string;
  searchQuery: string;
};

const SearchBar = ({onSubmit, placeholder, searchQuery} : Props) => {
    const form = useForm<searchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery: "",
        }

    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center flex-row gap-3 justify-between border-2 rounded-full p-2">
                <Search strokeWidth={2.5} size={30} className="hidden md:block text-primary"/>
                <FormField
                    control={form.control}
                    name="searchQuery"
                    render={({field}) => <FormItem className="flex-1">
                        <FormControl>
                            <Input
                                {...field}
                                className="border-none shadow-none text-xl focus-visible:ring-0 placeholder-gray-200"
                                placeholder={placeholder}
                            />
                        </FormControl>
                    </FormItem>}
                />

                <Button type="submit" variant="default" className="rounded-full ">
                    Search
                </Button>
            </form>
        </Form>
    )
}

export default SearchBar;