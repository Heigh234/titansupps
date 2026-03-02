'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useToastStore } from '@/store/useToastStore';

/*
 * framer-motion eliminado — reemplazado por CSS animation.
 * El auth layout NO incluye el Navbar, por lo que framer-motion
 * no estaba en el bundle compartido de estas rutas.
 * Ahorro: ~30 KiB de framer-motion en el chunk de /auth/*.
 */

const loginSchema = z.object({
  email: z.string().email({ message: "Formato de correo inválido" }),
  password: z.string().min(1, { message: "La contraseña es requerida" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/account';
  const login = useAuthStore((state) => state.login);
  const addToast = useToastStore((state) => state.addToast);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 800));

    const emailName = data.email.split('@')[0];
    const name = emailName.charAt(0).toUpperCase() + emailName.slice(1);

    login({ name, email: data.email });

    addToast({
      title: '¡Bienvenido de vuelta!',
      message: `Sesión iniciada. Tu cuartel general te espera.`,
      type: 'success',
    });

    setIsLoading(false);
    router.push(redirectTo);
  };

  return (
    <div className="animate-[fadeSlideUp_0.4s_ease-out_both]">
      <h1 className="font-heading text-4xl text-titan-text uppercase mb-2">Acceso a tu cuenta</h1>
      <p className="text-titan-text-muted mb-8">Ingresa tus credenciales para continuar tu progreso.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-titan-text-muted uppercase tracking-wider mb-2">Correo Electrónico</label>
          <input 
            {...register('email')}
            type="email"
            disabled={isLoading}
            className={`w-full bg-titan-surface border ${errors.email ? 'border-red-500' : 'border-titan-border'} p-4 text-titan-text focus:outline-none focus:border-titan-accent transition-colors disabled:opacity-50`}
            placeholder="atleta@dominio.com"
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-bold text-titan-text-muted uppercase tracking-wider">Contraseña</label>
            <Link href="/auth/forgot-password" className="text-xs text-titan-accent hover:text-white transition-colors uppercase tracking-widest">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative">
            <input 
              {...register('password')}
              type={showPassword ? "text" : "password"}
              disabled={isLoading}
              className={`w-full bg-titan-surface border ${errors.password ? 'border-red-500' : 'border-titan-border'} p-4 pr-12 text-titan-text focus:outline-none focus:border-titan-accent transition-colors disabled:opacity-50`}
              placeholder="••••••••"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-titan-text-muted hover:text-white transition-colors"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-[60px] bg-titan-text text-titan-bg font-heading text-2xl uppercase tracking-widest hover:bg-titan-accent hover:text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="animate-spin" size={24} /> : 'Iniciar Sesión'}
        </button>
      </form>

      <div className="my-8 flex items-center gap-4">
        <div className="flex-1 h-px bg-titan-border"></div>
        <span className="text-titan-text-muted text-xs uppercase tracking-widest font-bold">O continúa con</span>
        <div className="flex-1 h-px bg-titan-border"></div>
      </div>

      <button className="w-full h-[50px] border border-titan-border bg-titan-surface hover:bg-titan-surface-hover transition-colors text-titan-text font-bold text-sm flex items-center justify-center gap-3">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Google
      </button>

      <p className="mt-8 text-center text-titan-text-muted text-sm">
        ¿Aún no eres miembro?{' '}
        <Link href="/auth/register" className="text-titan-text font-bold hover:text-titan-accent transition-colors border-b border-titan-text hover:border-titan-accent pb-1">
          Forja tu cuenta aquí
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
