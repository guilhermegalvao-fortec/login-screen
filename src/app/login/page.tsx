"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { boolean, z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function Login() {
  const itemCheck = [
    {
      id: "i consent to being contacted by the team",
      label: "I consent to being contacted by the team",
    },
  ] as const;
  const FormSchema = z.object({
    nome: z.string().min(1, {
      message: "campo nome precisa ser preenchido.",
    }),
    sobrenome: z.string().min(1, {
      message: "campo sobrenome precisa ser preenchido.",
    }),
    email: z
      .string()
      .min(1, {
        message: "campo email precisa ser preenchido",
      })
      .includes("@", { message: "email está inválido" }),
    option: z.enum(["general enquiry", "support request"], {
      message: "precisa selecionar uma opção",
    }),
    text: z.string().min(1, {
      message: "campo message precisa ser preenchido.",
    }),
    itemCheck: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: "selecione a opção",
      }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nome: "",
      sobrenome: "",
      email: "",
      text: "",
      itemCheck: [""],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const res = await fetch("http://localhost:3000/api", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const dataSuccess = await res.json();
    console.log(dataSuccess);
  }

  return (
    <div className="h-full flex items-center justify-center bg-emerald-100 p-10">
      <div className="space-y-4  bg-white max-w-[600px]  rounded-lg p-4">
        <Form {...form}>
          <h1 className="text-center pt-2 text-xl font-semibold">Login</h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sobrenome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sobrenome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="option"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Query Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="general enquiry" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          General Enquiry
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="support request" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Support Request
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="itemCheck"
              render={() => (
                <FormItem>
                  {itemCheck.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="itemCheck"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
