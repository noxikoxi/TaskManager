import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import React, {useEffect} from "react";
import {Button} from "@/components/ui/button";
import {User} from "@/lib/types";
import LoadingButton from "@/components/LoadingButton";

const formSchema = z.object({
    email: z.string(),
    username: z.string()
        .min(1, "Username must have at least 1 character")
        .max(60, "Username cannot exceed 60 characters"),
    firstName: z.string()
        .min(1, "First name must have at least 1 character")
        .max(60, "First name cannot exceed 60 characters"),
    lastName: z.string()
        .min(1, "Last name must have at least 1 character")
        .max(60, "Last name cannot exceed 60 characters"),
    company: z.string()
        .max(60, "Company name exceed 60 characters"),
    aboutMe: z.string()
        .max(300, "About me cannot exceed 300 characters"),
    city: z.string()
        .min(1, "City must have at least 1 character")
        .max(60, "City cannot exceed 60 characters"),
    country: z.string()
        .min(1, "Country must have at least 1 character")
        .max(60, "Country cannot exceed 60 characters"),
})

export type userProfileForm = z.infer<typeof formSchema>;

type Props = {
    currentUser: User;
    onSave: (userProfileData: userProfileForm) => void;
    isLoading: boolean
}

const UserProfileForm = ({currentUser, onSave, isLoading} : Props) => {
    const form = useForm<userProfileForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: currentUser.email,
            username: currentUser.username || "",
            firstName: currentUser.firstName || "",
            lastName: currentUser.lastName || "",
            company: currentUser.company || "",
            city: currentUser.city || "",
            country: currentUser.country || "",
            aboutMe: currentUser.aboutMe || ""
        },
    });

    useEffect( () => {
        form.reset(currentUser);
    }, [currentUser, form]);

    return (
        <Form {...form}>
            <form
                className="bg-background p-10 rounded flex flex-col gap-3 border-2"
                onSubmit={form.handleSubmit(onSave)}
            >
                <div>
                    <h2 className="text-2xl font-bold">User Profile</h2>
                    <FormDescription>
                        View and change your profile information here
                    </FormDescription>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled/>
                                </FormControl>
                            </FormItem>
                        )}

                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="company"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="city"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control = {form.control}
                    name="aboutMe"
                    render = {({field}) => (
                        <FormItem>
                            <FormLabel>About Me</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Say something about yourself"
                                    {...field}
                                    className="w-full md:h-[300px] bg-white resize-none"

                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="flex flex-row flex-grow justify-start">
                    {isLoading ? (
                        <LoadingButton/>

                        ) : (
                        <Button variant="secondary" type="submit" className="w-[25%]">
                            Update
                        </Button>
                    )}
                </div>
            </form>
        </Form>

    )
}

export default UserProfileForm;