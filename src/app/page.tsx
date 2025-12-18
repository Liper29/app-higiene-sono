import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Star, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center space-y-8 max-w-md">
        <div className="flex justify-center">
          <Moon className="h-16 w-16 text-purple-400" />
        </div>
        <h1 className="text-4xl font-bold text-white">
          Dormir Bem
        </h1>
        <p className="text-slate-300 text-lg">
          Seu guia pessoal para uma noite de sono perfeita. Melhore seus hábitos e acorde renovado.
        </p>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2 text-slate-400">
            <Star className="h-5 w-5" />
            <span>Diagnóstico personalizado</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-400">
            <Zap className="h-5 w-5" />
            <span>Rotinas científicas</span>
          </div>
        </div>
        <Link href="/onboarding">
          <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700">
            Começar Jornada
          </Button>
        </Link>
      </div>
    </div>
  );
}