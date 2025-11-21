'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  PieChart, 
  Settings, 
  Plus, 
  Minus,
  Filter,
  Calendar,
  Target,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Download,
  Eye,
  MapPin,
  Clock,
  X,
  Edit,
  Trash2,
  Home,
  TrendingUpIcon,
  TrendingDownIcon,
  FileText,
  MessageCircle,
  Menu,
  Bell,
  Repeat,
  LogOut
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, Pie, Tooltip, Legend } from 'recharts'

// COR VERDE DA LOGO AXIS FINANCE
const AXIS_GREEN = '#00D9A3'

// PALETA DE CORES VIBRANTES PARA GRÁFICOS
const CHART_COLORS = [
  '#00D9A3', // Verde Axis
  '#FF6B6B', // Vermelho coral
  '#4ECDC4', // Turquesa
  '#FFD93D', // Amarelo
  '#A78BFA', // Roxo
  '#FB923C', // Laranja
  '#34D399', // Verde esmeralda
  '#F472B6', // Rosa
  '#60A5FA', // Azul
  '#FBBF24', // Dourado
]

// DADOS MOCK EXPANDIDOS PARA EXTRATO - MAIS REALISTAS E DETALHADOS
const initialMockTransactions = [
  // Dezembro 2024 - Transações Recentes
  { id: 1, type: 'expense', amount: 1250.00, category: 'Alimentação', description: 'Supermercado Extra', date: '2024-12-15', status: 'completed', location: 'Shopping Center Norte', time: '14:30', method: 'Cartão de Débito' },
  { id: 2, type: 'income', amount: 6500.00, category: 'Salário', description: 'Salário Dezembro', date: '2024-12-01', status: 'completed', location: 'Transferência Bancária', time: '08:00', method: 'PIX' },
  { id: 3, type: 'expense', amount: 850.00, category: 'Transporte', description: 'Combustível + Manutenção', date: '2024-12-14', status: 'completed', location: 'Posto Shell - Av. Paulista', time: '16:45', method: 'Cartão de Crédito' },
  { id: 4, type: 'expense', amount: 1800.00, category: 'Moradia', description: 'Aluguel + Condomínio', date: '2024-12-01', status: 'completed', location: 'Boleto Bancário', time: '09:15', method: 'Débito Automático' },
  { id: 5, type: 'income', amount: 800.00, category: 'Freelance', description: 'Projeto Website', date: '2024-12-10', status: 'completed', location: 'Transferência Online', time: '11:20', method: 'PIX' },
]

const initialMockCategories = [
  { id: 1, name: 'Alimentação', budget: 2000, spent: 1870, color: CHART_COLORS[0], icon: '🍽️', type: 'expense' },
  { id: 2, name: 'Transporte', budget: 1200, spent: 945, color: CHART_COLORS[1], icon: '🚗', type: 'expense' },
  { id: 3, name: 'Moradia', budget: 2500, spent: 2250, color: CHART_COLORS[2], icon: '🏠', type: 'expense' },
  { id: 4, name: 'Lazer', budget: 600, spent: 395, color: CHART_COLORS[3], icon: '🎬', type: 'expense' },
  { id: 5, name: 'Saúde', budget: 500, spent: 300, color: CHART_COLORS[4], icon: '⚕️', type: 'expense' },
  { id: 6, name: 'Salário', budget: 6500, spent: 0, color: CHART_COLORS[5], icon: '💼', type: 'income' },
  { id: 7, name: 'Freelance', budget: 2000, spent: 0, color: CHART_COLORS[6], icon: '💻', type: 'income' },
  { id: 8, name: 'Investimentos', budget: 500, spent: 0, color: CHART_COLORS[7], icon: '📈', type: 'income' },
]

// CONTAS PLANEJADAS (RECORRENTES)
const initialRecurringBills = [
  { id: 1, name: 'Conta de Luz', amount: 180.00, dueDay: 10, category: 'Moradia', icon: '💡', active: true },
  { id: 2, name: 'Internet', amount: 120.00, dueDay: 15, category: 'Moradia', icon: '🌐', active: true },
  { id: 3, name: 'Água', amount: 85.00, dueDay: 5, category: 'Moradia', icon: '💧', active: true },
  { id: 4, name: 'Aluguel', amount: 1800.00, dueDay: 1, category: 'Moradia', icon: '🏠', active: true },
  { id: 5, name: 'Academia', amount: 120.00, dueDay: 20, category: 'Saúde', icon: '🏋️', active: true },
  { id: 6, name: 'Netflix', amount: 45.90, dueDay: 12, category: 'Lazer', icon: '📺', active: true },
  { id: 7, name: 'Spotify', amount: 21.90, dueDay: 12, category: 'Lazer', icon: '🎵', active: true },
]

const monthlyData = [
  { month: 'Jul', income: 7200, expenses: 5800 },
  { month: 'Ago', income: 6800, expenses: 5400 },
  { month: 'Set', income: 7500, expenses: 6200 },
  { month: 'Out', income: 7100, expenses: 5900 },
  { month: 'Nov', income: 6900, expenses: 5600 },
  { month: 'Dez', income: 7950, expenses: 6760 },
]

export default function FinancialDashboard() {
  const { signOut, user } = useAuth()
  const [activeSection, setActiveSection] = useState('inicio')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  
  // Estado para gerenciar as transações (agora dinâmico)
  const [mockTransactions, setMockTransactions] = useState(initialMockTransactions)
  
  // Estado para gerenciar as categorias (agora dinâmico)
  const [mockCategories, setMockCategories] = useState(initialMockCategories)
  
  // Estado para gerenciar contas recorrentes
  const [recurringBills, setRecurringBills] = useState(initialRecurringBills)

  // Estados para o Modal de Nova Transação
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  })

  // Verificar contas próximas do vencimento e criar notificações
  useEffect(() => {
    const checkUpcomingBills = () => {
      const today = new Date()
      const currentDay = today.getDate()
      const newNotifications: any[] = []

      recurringBills.forEach(bill => {
        if (!bill.active) return

        const daysUntilDue = bill.dueDay - currentDay
        
        // Notificar 3 dias antes, no dia, e se estiver atrasado
        if (daysUntilDue >= 0 && daysUntilDue <= 3) {
          newNotifications.push({
            id: `bill-${bill.id}-${today.getMonth()}`,
            type: 'warning',
            title: daysUntilDue === 0 ? 'Vence Hoje!' : `Vence em ${daysUntilDue} dia${daysUntilDue > 1 ? 's' : ''}`,
            message: `${bill.name} - R$ ${bill.amount.toFixed(2)}`,
            bill: bill,
            daysUntilDue
          })
        } else if (daysUntilDue < 0 && daysUntilDue > -5) {
          newNotifications.push({
            id: `bill-${bill.id}-${today.getMonth()}-late`,
            type: 'danger',
            title: 'Conta Atrasada!',
            message: `${bill.name} - R$ ${bill.amount.toFixed(2)} (${Math.abs(daysUntilDue)} dia${Math.abs(daysUntilDue) > 1 ? 's' : ''} de atraso)`,
            bill: bill,
            daysUntilDue
          })
        }
      })

      setNotifications(newNotifications)
    }

    checkUpcomingBills()
    const interval = setInterval(checkUpcomingBills, 3600000)
    return () => clearInterval(interval)
  }, [recurringBills])

  // CÁLCULOS PRINCIPAIS
  const allTransactions = mockTransactions
  const totalIncome = allTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = allTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpenses

  // Função para adicionar nova transação
  const handleAddTransaction = () => {
    if (!newTransaction.amount || !newTransaction.category || !newTransaction.description) {
      alert('Por favor, preencha todos os campos!')
      return
    }

    const transaction = {
      id: mockTransactions.length + 1,
      type: newTransaction.type as 'income' | 'expense',
      amount: parseFloat(newTransaction.amount),
      category: newTransaction.category,
      description: newTransaction.description,
      date: newTransaction.date,
      status: 'completed',
      location: 'Manual',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      method: 'Manual'
    }

    setMockTransactions([transaction, ...mockTransactions])
    setIsModalOpen(false)
    setNewTransaction({
      type: 'expense',
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    })
  }

  // Função para deletar transação
  const handleDeleteTransaction = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      setMockTransactions(mockTransactions.filter(t => t.id !== id))
    }
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Notificações de Contas */}
      {notifications.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Lembretes de Contas ({notifications.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {notifications.map(notif => (
                <div 
                  key={notif.id} 
                  className={`p-3 rounded-lg flex items-center justify-between ${
                    notif.type === 'danger' ? 'bg-red-100 border border-red-300' : 'bg-yellow-100 border border-yellow-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{notif.bill.icon}</span>
                    <div>
                      <p className={`font-medium ${notif.type === 'danger' ? 'text-red-800' : 'text-yellow-800'}`}>
                        {notif.title}
                      </p>
                      <p className="text-sm text-gray-700">{notif.message}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    style={{ backgroundColor: AXIS_GREEN }}
                    className="text-white hover:opacity-90"
                    onClick={() => setActiveSection('contas-planejadas')}
                  >
                    Ver Detalhes
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Saldo Total</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Receitas</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-gray-500">Este mês</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Despesas</CardTitle>
            <TrendingDown className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-gray-500">Este mês</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Taxa de Economia</CardTitle>
            <Target className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              {totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : '0.0'}%
            </div>
            <p className="text-xs text-gray-500">Meta: 20%</p>
          </CardContent>
        </Card>
      </div>

      {/* Botão Nova Transação */}
      <div className="flex justify-end">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button 
              size="lg"
              style={{ backgroundColor: AXIS_GREEN }}
              className="text-white hover:opacity-90"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nova Transação
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Transação</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select 
                  value={newTransaction.type} 
                  onValueChange={(value) => setNewTransaction({...newTransaction, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Receita</SelectItem>
                    <SelectItem value="expense">Despesa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Valor (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select 
                  value={newTransaction.category} 
                  onValueChange={(value) => setNewTransaction({...newTransaction, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCategories
                      .filter(cat => cat.type === newTransaction.type)
                      .map(cat => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.icon} {cat.name}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Descrição</Label>
                <Input
                  placeholder="Ex: Supermercado, Salário..."
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Data</Label>
                <Input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                />
              </div>

              <Button 
                onClick={handleAddTransaction}
                className="w-full text-white"
                style={{ backgroundColor: AXIS_GREEN }}
              >
                Adicionar Transação
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Fluxo de Caixa Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px' }}
                  formatter={(value: any) => `R$ ${value.toLocaleString('pt-BR')}`}
                />
                <Legend />
                <Bar dataKey="income" fill={CHART_COLORS[5]} name="Receitas" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expenses" fill={CHART_COLORS[1]} name="Despesas" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Despesas por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={mockCategories.filter(cat => cat.type === 'expense')}
                  dataKey="spent"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.name}: R$ ${entry.spent}`}
                >
                  {mockCategories.filter(cat => cat.type === 'expense').map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `R$ ${value.toLocaleString('pt-BR')}`} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Transações Recentes */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-black">Transações Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTransactions.slice(0, 10).map(transaction => (
              <div 
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'income' ? (
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-black">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-bold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'} R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTransaction(transaction.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Orçamento por Categoria */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-black">Orçamento por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCategories.filter(cat => cat.type === 'expense').map(category => {
              const percentage = (category.spent / category.budget) * 100
              const isOverBudget = percentage > 100
              
              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{category.icon}</span>
                      <span className="font-medium text-black">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${isOverBudget ? 'text-red-600' : 'text-gray-700'}`}>
                        R$ {category.spent.toFixed(2)} / R$ {category.budget.toFixed(2)}
                      </p>
                      <p className={`text-xs ${isOverBudget ? 'text-red-600' : 'text-gray-500'}`}>
                        {percentage.toFixed(1)}% utilizado
                      </p>
                    </div>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className="h-2"
                    style={{
                      backgroundColor: '#e5e7eb'
                    }}
                  />
                  {isOverBudget && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Orçamento excedido em R$ {(category.spent - category.budget).toFixed(2)}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderRecurringBills = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black">Contas Planejadas</h2>
          <p className="text-gray-500">Gerencie suas contas recorrentes mensais</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recurringBills.map(bill => {
          const today = new Date().getDate()
          const daysUntilDue = bill.dueDay - today
          const isUpcoming = daysUntilDue >= 0 && daysUntilDue <= 3
          const isOverdue = daysUntilDue < 0

          return (
            <Card 
              key={bill.id} 
              className={`border-2 ${
                isOverdue ? 'border-red-300 bg-red-50' : 
                isUpcoming ? 'border-yellow-300 bg-yellow-50' : 
                'border-gray-200'
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{bill.icon}</span>
                    <div>
                      <CardTitle className="text-lg text-black">{bill.name}</CardTitle>
                      <p className="text-sm text-gray-500">{bill.category}</p>
                    </div>
                  </div>
                  {isOverdue && <Badge variant="destructive">Atrasado</Badge>}
                  {isUpcoming && <Badge className="bg-yellow-500">Próximo</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Valor:</span>
                    <span className="text-xl font-bold text-black">
                      R$ {bill.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Vencimento:</span>
                    <span className="font-medium text-black">
                      Dia {bill.dueDay}
                      {isUpcoming && ` (${daysUntilDue} dia${daysUntilDue !== 1 ? 's' : ''})`}
                      {isOverdue && ` (${Math.abs(daysUntilDue)} dia${Math.abs(daysUntilDue) !== 1 ? 's' : ''} atraso)`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge variant={bill.active ? "default" : "secondary"}>
                      {bill.active ? 'Ativa' : 'Inativa'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Resumo Total */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-black">Resumo Mensal de Contas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total de Contas</p>
              <p className="text-2xl font-bold text-black">{recurringBills.length}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Contas Ativas</p>
              <p className="text-2xl font-bold text-black">
                {recurringBills.filter(b => b.active).length}
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Valor Total Mensal</p>
              <p className="text-2xl font-bold text-black">
                R$ {recurringBills
                  .filter(b => b.active)
                  .reduce((sum, b) => sum + b.amount, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/34befde2-dd31-4ab6-af94-a85d8d2dfcdb.png" 
                alt="Axis Finance Logo" 
                className="h-10 w-10 object-contain"
              />
              <h1 className="text-xl font-bold text-black">Axis Finance</h1>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            <button
              onClick={() => {
                setActiveSection('inicio')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === 'inicio'
                  ? 'text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              style={activeSection === 'inicio' ? { backgroundColor: AXIS_GREEN } : {}}
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Início</span>
            </button>

            <button
              onClick={() => {
                setActiveSection('contas-planejadas')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === 'contas-planejadas'
                  ? 'text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              style={activeSection === 'contas-planejadas' ? { backgroundColor: AXIS_GREEN } : {}}
            >
              <Repeat className="h-5 w-5" />
              <span className="font-medium">Contas Planejadas</span>
              {notifications.length > 0 && (
                <Badge className="ml-auto bg-red-500">{notifications.length}</Badge>
              )}
            </button>
          </div>
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="text-sm">
                <p className="font-medium text-black truncate max-w-[120px]">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
          <Button 
            onClick={signOut}
            variant="outline"
            className="w-full text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Overlay para mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header com botão hambúrguer para mobile */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/34befde2-dd31-4ab6-af94-a85d8d2dfcdb.png" 
              alt="Axis Finance Logo" 
              className="h-8 w-8 object-contain"
            />
            <h1 className="text-lg font-bold text-black">Axis Finance</h1>
          </div>
          {notifications.length > 0 && (
            <button 
              className="ml-auto relative p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setActiveSection('contas-planejadas')}
            >
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            </button>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeSection === 'inicio' && renderDashboard()}
          {activeSection === 'contas-planejadas' && renderRecurringBills()}
        </div>
      </main>
    </div>
  )
}
