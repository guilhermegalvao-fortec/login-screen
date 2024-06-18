"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Checkbox } from "@/components/ui/checkbox";
import { exportTraceState } from "next/dist/trace";

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
});

export default function Login() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nome: "",
      sobrenome: "",
      email: "",
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
    <div className="bg-green-500 h-screen flex items-center justify-center">
      <div className="space-y-4  bg-white w-[300px] md:w-[600px] rounded-lg p-4 flex flex-col items-center justify-center">
        <Form {...form}>
          <h1 className="text-center pt-2 text-xl font-semibold">Login</h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
