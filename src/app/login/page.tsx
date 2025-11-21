'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertCircle, Loader2 } from 'lucide-react'

const AXIS_GREEN = '#00D9A3'

export default function LoginPage() {
  const { user, loading, signIn, signUp } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Estados para Login
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  
  // Estados para Registro
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('')

  // Redirecionar para dashboard se já estiver logado
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  // Mostrar loading enquanto verifica sessão
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">Verificando sessão...</p>
        </div>
      </div>
    )
  }

  // Se já estiver logado, não renderizar nada (vai redirecionar)
  if (user) {
    return null
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (!loginEmail || !loginPassword) {
        setError('Por favor, preencha todos os campos.')
        setIsLoading(false)
        return
      }

      const { error: signInError } = await signIn(loginEmail, loginPassword)
      
      if (signInError) {
        console.error('Erro ao fazer login:', signInError)
        
        // Tratamento de erros mais específico
        if (signInError.message.includes('Invalid login credentials')) {
          setError('Email ou senha incorretos. Verifique suas credenciais.')
        } else if (signInError.message.includes('Email not confirmed')) {
          setError('Por favor, confirme seu email antes de fazer login.')
        } else if (signInError.message.includes('JSON')) {
          setError('Erro de conexão com o servidor. Verifique suas variáveis de ambiente.')
        } else {
          setError(signInError.message || 'Erro ao fazer login. Tente novamente.')
        }
      }
    } catch (err: any) {
      console.error('Erro inesperado ao fazer login:', err)
      setError('Erro inesperado. Verifique sua conexão e tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (!signupEmail || !signupPassword || !signupConfirmPassword) {
        setError('Por favor, preencha todos os campos.')
        setIsLoading(false)
        return
      }

      if (signupPassword !== signupConfirmPassword) {
        setError('As senhas não coincidem.')
        setIsLoading(false)
        return
      }

      if (signupPassword.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres.')
        setIsLoading(false)
        return
      }

      const { error: signUpError } = await signUp(signupEmail, signupPassword)
      
      if (signUpError) {
        console.error('Erro ao criar conta:', signUpError)
        
        // Tratamento de erros mais específico
        if (signUpError.message.includes('already registered')) {
          setError('Este email já está cadastrado. Tente fazer login.')
        } else if (signUpError.message.includes('JSON')) {
          setError('Erro de conexão com o servidor. Verifique suas variáveis de ambiente.')
        } else {
          setError(signUpError.message || 'Erro ao criar conta.')
        }
      } else {
        setError('')
        alert('Conta criada com sucesso! Verifique seu email para confirmar.')
      }
    } catch (err: any) {
      console.error('Erro inesperado ao criar conta:', err)
      setError('Erro inesperado. Verifique sua conexão e tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/34befde2-dd31-4ab6-af94-a85d8d2dfcdb.png" 
              alt="Axis Finance Logo" 
              className="h-16 w-16 object-contain"
            />
            <h1 className="text-4xl font-bold text-white">Axis Finance</h1>
          </div>
          <p className="text-gray-400">Gestão Financeira Inteligente</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Cadastro</TabsTrigger>
          </TabsList>

          {/* Tab de Login */}
          <TabsContent value="login">
            <Card className="border-gray-700 bg-slate-800/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">Bem-vindo de volta</CardTitle>
                <CardDescription className="text-gray-400">
                  Entre com suas credenciais para acessar sua conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-gray-200">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="bg-slate-700/50 border-gray-600 text-white placeholder:text-gray-400"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-gray-200">Senha</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="bg-slate-700/50 border-gray-600 text-white placeholder:text-gray-400"
                      disabled={isLoading}
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <p className="text-sm text-red-500">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full text-white hover:opacity-90"
                    style={{ backgroundColor: AXIS_GREEN }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      'Entrar'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Cadastro */}
          <TabsContent value="signup">
            <Card className="border-gray-700 bg-slate-800/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">Criar conta</CardTitle>
                <CardDescription className="text-gray-400">
                  Preencha os dados abaixo para criar sua conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-gray-200">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="bg-slate-700/50 border-gray-600 text-white placeholder:text-gray-400"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-gray-200">Senha</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="bg-slate-700/50 border-gray-600 text-white placeholder:text-gray-400"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password" className="text-gray-200">Confirmar Senha</Label>
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      className="bg-slate-700/50 border-gray-600 text-white placeholder:text-gray-400"
                      disabled={isLoading}
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <p className="text-sm text-red-500">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full text-white hover:opacity-90"
                    style={{ backgroundColor: AXIS_GREEN }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Criando conta...
                      </>
                    ) : (
                      'Criar Conta'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <p className="text-center text-gray-500 text-sm mt-6">
          Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade
        </p>
      </div>
    </div>
  )
}
