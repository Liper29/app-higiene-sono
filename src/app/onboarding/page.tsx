import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Heart } from "lucide-react";

export default function Onboarding() {
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Bem-vindo ao Dormir Bem
          </h1>
          <p className="text-slate-300">
            Vamos criar juntos uma rotina de sono saudável baseada na ciência.
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-8 w-8 text-green-400 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Diagnóstico Inicial
                  </h3>
                  <p className="text-slate-300">
                    Avalie seus hábitos atuais de sono para identificar pontos de melhoria.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Clock className="h-8 w-8 text-blue-400 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Rotina Personalizada
                  </h3>
                  <p className="text-slate-300">
                    Receba sugestões de hábitos baseadas em evidências científicas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Heart className="h-8 w-8 text-pink-400 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Acompanhamento Diário
                  </h3>
                  <p className="text-slate-300">
                    Monitore seu progresso com check-ins simples e insights acionáveis.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <p className="text-sm text-slate-400">
            Este app não substitui orientação médica profissional.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700">
              Criar Conta
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline" size="lg" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800">
              Já tenho conta
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}