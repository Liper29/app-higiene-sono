import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabase";

const signupSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  age: z.number().min(13, "Idade mínima é 13 anos").optional(),
  acceptTerms: z.boolean().refine(val => val === true, "Você deve aceitar os termos"),
  acceptPrivacy: z.boolean().refine(val => val === true, "Você deve aceitar a política de privacidade"),
});

type SignupForm = z.infer<typeof signupSchema>;

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            age: data.age,
          },
        },
      });

      if (error) throw error;

      // Redirect to email confirmation or dashboard
      router.push("/auth/verify");
    } catch (error) {
      console.error("Signup error:", error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Criar Conta</CardTitle>
          <CardDescription className="text-slate-400">
            Junte-se ao Dormir Bem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-slate-300">Nome</Label>
              <Input
                id="name"
                {...register("name")}
                className="bg-slate-700 border-slate-600 text-white"
              />
              {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="email" className="text-slate-300">E-mail</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="bg-slate-700 border-slate-600 text-white"
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-300">Senha</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className="bg-slate-700 border-slate-600 text-white"
              />
              {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
            </div>

            <div>
              <Label htmlFor="age" className="text-slate-300">Idade (opcional)</Label>
              <Input
                id="age"
                type="number"
                {...register("age", { valueAsNumber: true })}
                className="bg-slate-700 border-slate-600 text-white"
              />
              {errors.age && <p className="text-red-400 text-sm">{errors.age.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={watch("acceptTerms")}
                  onCheckedChange={(checked) => setValue("acceptTerms", checked as boolean)}
                />
                <Label htmlFor="acceptTerms" className="text-sm text-slate-300">
                  Aceito os <Link href="/terms" className="text-purple-400 underline">Termos de Uso</Link>
                </Label>
              </div>
              {errors.acceptTerms && <p className="text-red-400 text-sm">{errors.acceptTerms.message}</p>}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptPrivacy"
                  checked={watch("acceptPrivacy")}
                  onCheckedChange={(checked) => setValue("acceptPrivacy", checked as boolean)}
                />
                <Label htmlFor="acceptPrivacy" className="text-sm text-slate-300">
                  Aceito a <Link href="/privacy" className="text-purple-400 underline">Política de Privacidade</Link>
                </Label>
              </div>
              {errors.acceptPrivacy && <p className="text-red-400 text-sm">{errors.acceptPrivacy.message}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Criando..." : "Criar Conta"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link href="/auth/login" className="text-purple-400 hover:underline">
              Já tem conta? Faça login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}