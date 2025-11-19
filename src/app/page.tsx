'use client'

import { useState, useEffect } from 'react'
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
  Repeat
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
  { id: 6, type: 'expense', amount: 320.00, category: 'Lazer', description: 'Cinema + Jantar', date: '2024-12-12', status: 'completed', location: 'Shopping Iguatemi', time: '19:30', method: 'Cartão de Crédito' },
  { id: 7, type: 'expense', amount: 180.00, category: 'Saúde', description: 'Farmácia + Consulta', date: '2024-12-08', status: 'completed', location: 'Drogasil - Centro', time: '10:15', method: 'Cartão de Débito' },
  { id: 8, type: 'income', amount: 450.00, category: 'Freelance', description: 'Consultoria TI', date: '2024-12-05', status: 'completed', location: 'Transferência Online', time: '15:45', method: 'TED' },
  { id: 9, type: 'expense', amount: 280.00, category: 'Alimentação', description: 'Delivery + Restaurante', date: '2024-12-03', status: 'completed', location: 'iFood + Outback', time: '20:15', method: 'Cartão de Crédito' },
  { id: 10, type: 'expense', amount: 95.00, category: 'Transporte', description: 'Uber + Ônibus', date: '2024-12-02', status: 'completed', location: 'Centro - Zona Sul', time: '07:30', method: 'Cartão de Crédito' },
  
  // Transações Adicionais - Novembro 2024
  { id: 11, type: 'expense', amount: 450.00, category: 'Moradia', description: 'Conta de Luz', date: '2024-11-28', status: 'completed', location: 'Enel SP', time: '14:20', method: 'Débito Automático' },
  { id: 12, type: 'expense', amount: 120.00, category: 'Saúde', description: 'Academia', date: '2024-11-25', status: 'completed', location: 'Smart Fit', time: '18:00', method: 'Débito Automático' },
  { id: 13, type: 'income', amount: 200.00, category: 'Investimentos', description: 'Dividendos', date: '2024-11-20', status: 'completed', location: 'Corretora XP', time: '09:00', method: 'Transferência' },
  { id: 14, type: 'expense', amount: 75.00, category: 'Lazer', description: 'Streaming + Apps', date: '2024-11-15', status: 'completed', location: 'Netflix + Spotify', time: '12:00', method: 'Cartão de Crédito' },
  { id: 15, type: 'expense', amount: 340.00, category: 'Alimentação', description: 'Feira + Açougue', date: '2024-11-18', status: 'completed', location: 'Mercado Municipal', time: '08:30', method: 'Dinheiro' },
  { id: 16, type: 'expense', amount: 220.00, category: 'Transporte', description: 'Manutenção Carro', date: '2024-11-12', status: 'completed', location: 'Oficina do João', time: '13:45', method: 'PIX' },
  { id: 17, type: 'income', amount: 1200.00, category: 'Freelance', description: 'Desenvolvimento App', date: '2024-11-10', status: 'completed', location: 'Cliente Remoto', time: '16:30', method: 'PIX' },
  { id: 18, type: 'expense', amount: 89.90, category: 'Saúde', description: 'Medicamentos', date: '2024-11-08', status: 'completed', location: 'Drogaria São Paulo', time: '11:15', method: 'Cartão de Débito' },
  { id: 19, type: 'expense', amount: 156.00, category: 'Lazer', description: 'Show + Estacionamento', date: '2024-11-05', status: 'completed', location: 'Allianz Parque', time: '21:00', method: 'Cartão de Crédito' },
  { id: 20, type: 'expense', amount: 67.50, category: 'Alimentação', description: 'Lanche + Café', date: '2024-11-03', status: 'completed', location: 'Starbucks', time: '15:20', method: 'Cartão de Crédito' },
  
  // Outubro 2024
  { id: 21, type: 'income', amount: 6500.00, category: 'Salário', description: 'Salário Outubro', date: '2024-10-30', status: 'completed', location: 'Transferência Bancária', time: '08:00', method: 'PIX' },
  { id: 22, type: 'expense', amount: 1650.00, category: 'Moradia', description: 'Aluguel Outubro', date: '2024-10-28', status: 'completed', location: 'Boleto Bancário', time: '09:30', method: 'Débito Automático' },
  { id: 23, type: 'expense', amount: 890.00, category: 'Alimentação', description: 'Compras do Mês', date: '2024-10-25', status: 'completed', location: 'Carrefour', time: '16:00', method: 'Cartão de Débito' },
  { id: 24, type: 'expense', amount: 245.00, category: 'Transporte', description: 'Combustível', date: '2024-10-22', status: 'completed', location: 'Posto BR', time: '12:30', method: 'Cartão de Crédito' },
  { id: 25, type: 'income', amount: 350.00, category: 'Freelance', description: 'Design Gráfico', date: '2024-10-20', status: 'completed', location: 'Cliente Local', time: '14:15', method: 'PIX' },
  { id: 26, type: 'expense', amount: 125.00, category: 'Saúde', description: 'Consulta Médica', date: '2024-10-18', status: 'completed', location: 'Clínica São Luiz', time: '10:00', method: 'Cartão de Débito' },
  { id: 27, type: 'expense', amount: 78.90, category: 'Lazer', description: 'Livros + Revista', date: '2024-10-15', status: 'completed', location: 'Livraria Cultura', time: '17:45', method: 'Cartão de Crédito' },
  { id: 28, type: 'expense', amount: 189.00, category: 'Alimentação', description: 'Restaurante Japonês', date: '2024-10-12', status: 'completed', location: 'Liberdade', time: '19:30', method: 'Cartão de Crédito' },
  { id: 29, type: 'expense', amount: 45.00, category: 'Transporte', description: 'Estacionamento', date: '2024-10-10', status: 'completed', location: 'Shopping Morumbi', time: '14:00', method: 'Dinheiro' },
  { id: 30, type: 'income', amount: 150.00, category: 'Investimentos', description: 'Rendimento Poupança', date: '2024-10-08', status: 'completed', location: 'Banco do Brasil', time: '08:30', method: 'Transferência' },
  
  // Setembro 2024
  { id: 31, type: 'income', amount: 6500.00, category: 'Salário', description: 'Salário Setembro', date: '2024-09-30', status: 'completed', location: 'Transferência Bancária', time: '08:00', method: 'PIX' },
  { id: 32, type: 'expense', amount: 1650.00, category: 'Moradia', description: 'Aluguel Setembro', date: '2024-09-28', status: 'completed', location: 'Boleto Bancário', time: '09:30', method: 'Débito Automático' },
  { id: 33, type: 'expense', amount: 720.00, category: 'Alimentação', description: 'Supermercado Pão de Açúcar', date: '2024-09-25', status: 'completed', location: 'Vila Madalena', time: '15:30', method: 'Cartão de Débito' },
  { id: 34, type: 'expense', amount: 380.00, category: 'Transporte', description: 'Combustível + Pedágio', date: '2024-09-22', status: 'completed', location: 'Viagem Interior', time: '08:15', method: 'Cartão de Crédito' },
  { id: 35, type: 'income', amount: 950.00, category: 'Freelance', description: 'Sistema Web', date: '2024-09-20', status: 'completed', location: 'Cliente Corporativo', time: '16:00', method: 'TED' },
  { id: 36, type: 'expense', amount: 167.50, category: 'Saúde', description: 'Exames Laboratoriais', date: '2024-09-18', status: 'completed', location: 'Laboratório Fleury', time: '07:30', method: 'Cartão de Débito' },
  { id: 37, type: 'expense', amount: 234.00, category: 'Lazer', description: 'Teatro + Jantar', date: '2024-09-15', status: 'completed', location: 'Centro Cultural', time: '20:00', method: 'Cartão de Crédito' },
  { id: 38, type: 'expense', amount: 145.80, category: 'Alimentação', description: 'Padaria + Hortifruti', date: '2024-09-12', status: 'completed', location: 'Comércio Local', time: '09:45', method: 'PIX' },
  { id: 39, type: 'expense', amount: 89.00, category: 'Transporte', description: 'Aplicativo de Transporte', date: '2024-09-10', status: 'completed', location: 'Aeroporto - Casa', time: '22:30', method: 'Cartão de Crédito' },
  { id: 40, type: 'income', amount: 275.00, category: 'Investimentos', description: 'Venda de Ações', date: '2024-09-08', status: 'completed', location: 'Corretora Rico', time: '11:15', method: 'Transferência' },
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

export default function FinancialPlatform() {
  const [activeSection, setActiveSection] = useState('inicio')
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [isAddRecurringBillOpen, setIsAddRecurringBillOpen] = useState(false)
  const [dateFilter, setDateFilter] = useState('30-days')
  const [customDateFrom, setCustomDateFrom] = useState('')
  const [customDateTo, setCustomDateTo] = useState('')
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isTransactionDetailOpen, setIsTransactionDetailOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  
  // Estado para gerenciar as transações (agora dinâmico)
  const [mockTransactions, setMockTransactions] = useState(initialMockTransactions)
  
  // Estado para gerenciar as categorias (agora dinâmico)
  const [mockCategories, setMockCategories] = useState(initialMockCategories)
  
  // Estado para gerenciar contas recorrentes
  const [recurringBills, setRecurringBills] = useState(initialRecurringBills)
  
  // Estados do formulário de nova transação
  const [newTransaction, setNewTransaction] = useState({
    type: '',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0], // Data atual por padrão
    location: '',
    method: ''
  })

  // Estados do formulário de nova categoria
  const [newCategory, setNewCategory] = useState({
    name: '',
    budget: '',
    color: AXIS_GREEN,
    icon: '💰',
    type: 'expense'
  })

  // Estados do formulário de nova conta recorrente
  const [newRecurringBill, setNewRecurringBill] = useState({
    name: '',
    amount: '',
    dueDay: '',
    category: '',
    icon: '💰'
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
    // Verificar a cada hora
    const interval = setInterval(checkUpcomingBills, 3600000)
    return () => clearInterval(interval)
  }, [recurringBills])

  // Função para resetar o formulário de transação
  const resetTransactionForm = () => {
    setNewTransaction({
      type: '',
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      method: ''
    })
  }

  // Função para resetar o formulário de categoria
  const resetCategoryForm = () => {
    setNewCategory({
      name: '',
      budget: '',
      color: AXIS_GREEN,
      icon: '💰',
      type: 'expense'
    })
  }

  // Função para resetar o formulário de conta recorrente
  const resetRecurringBillForm = () => {
    setNewRecurringBill({
      name: '',
      amount: '',
      dueDay: '',
      category: '',
      icon: '💰'
    })
  }

  // Função para adicionar nova transação
  const handleAddTransaction = () => {
    // Validação básica
    if (!newTransaction.type || !newTransaction.amount || !newTransaction.category || !newTransaction.description) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    // Criar nova transação
    const transaction = {
      id: Math.max(...mockTransactions.map(t => t.id)) + 1,
      type: newTransaction.type,
      amount: parseFloat(newTransaction.amount.replace(',', '.')),
      category: newTransaction.category,
      description: newTransaction.description,
      date: newTransaction.date,
      status: 'completed',
      location: newTransaction.location || 'Local não informado',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      method: newTransaction.method || 'Não informado'
    }

    // Adicionar a nova transação no início da lista (mais recente primeiro)
    setMockTransactions(prev => [transaction, ...prev])
    
    // Atualizar o gasto da categoria
    setMockCategories(prev => prev.map(cat => {
      if (cat.name === transaction.category && transaction.type === 'expense') {
        return { ...cat, spent: cat.spent + transaction.amount }
      }
      return cat
    }))
    
    // Fechar modal e resetar formulário
    setIsAddTransactionOpen(false)
    resetTransactionForm()
    
    // Feedback visual (opcional - pode ser substituído por toast)
    alert(`Transação "${transaction.description}" adicionada com sucesso!`)
  }

  // Função para adicionar nova categoria
  const handleAddCategory = () => {
    // Validação básica
    if (!newCategory.name || !newCategory.budget) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    // Verificar se categoria já existe
    const categoryExists = mockCategories.some(cat => 
      cat.name.toLowerCase() === newCategory.name.toLowerCase()
    )

    if (categoryExists) {
      alert('Já existe uma categoria com este nome.')
      return
    }

    // Criar nova categoria
    const category = {
      id: Math.max(...mockCategories.map(c => c.id)) + 1,
      name: newCategory.name,
      budget: parseFloat(newCategory.budget.replace(',', '.')),
      spent: 0, // Nova categoria começa com gasto zero
      color: newCategory.color,
      icon: newCategory.icon,
      type: newCategory.type
    }

    // Adicionar a nova categoria
    setMockCategories(prev => [...prev, category])
    
    // Fechar modal e resetar formulário
    setIsAddCategoryOpen(false)
    resetCategoryForm()
    
    // Feedback visual
    alert(`Categoria "${category.name}" criada com sucesso!`)
  }

  // Função para adicionar nova conta recorrente
  const handleAddRecurringBill = () => {
    if (!newRecurringBill.name || !newRecurringBill.amount || !newRecurringBill.dueDay || !newRecurringBill.category) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    const bill = {
      id: Math.max(...recurringBills.map(b => b.id), 0) + 1,
      name: newRecurringBill.name,
      amount: parseFloat(newRecurringBill.amount.replace(',', '.')),
      dueDay: parseInt(newRecurringBill.dueDay),
      category: newRecurringBill.category,
      icon: newRecurringBill.icon,
      active: true
    }

    setRecurringBills(prev => [...prev, bill])
    setIsAddRecurringBillOpen(false)
    resetRecurringBillForm()
    alert(`Conta recorrente "${bill.name}" adicionada com sucesso!`)
  }

  // Função para alternar status de conta recorrente
  const toggleRecurringBill = (id: number) => {
    setRecurringBills(prev => prev.map(bill => 
      bill.id === id ? { ...bill, active: !bill.active } : bill
    ))
  }

  // Função para deletar conta recorrente
  const deleteRecurringBill = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta conta recorrente?')) {
      setRecurringBills(prev => prev.filter(bill => bill.id !== id))
    }
  }

  // Função para filtrar transações por data
  const getFilteredTransactions = () => {
    const now = new Date()
    let startDate = new Date()

    switch (dateFilter) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        break
      case '7-days':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case '30-days':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case '90-days':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        break
      case 'this-year':
        startDate = new Date(now.getFullYear(), 0, 1)
        break
      case 'custom':
        if (customDateFrom && customDateTo) {
          startDate = new Date(customDateFrom)
          const endDate = new Date(customDateTo)
          return mockTransactions.filter(transaction => {
            const transactionDate = new Date(transaction.date)
            const matchesDate = transactionDate >= startDate && transactionDate <= endDate
            const matchesType = transactionTypeFilter === 'all' || transaction.type === transactionTypeFilter
            const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter
            const matchesSearch = searchTerm === '' || 
              transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
              transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
            return matchesDate && matchesType && matchesCategory && matchesSearch
          })
        }
        return mockTransactions.filter(transaction => {
          const matchesType = transactionTypeFilter === 'all' || transaction.type === transactionTypeFilter
          const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter
          const matchesSearch = searchTerm === '' || 
            transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
          return matchesType && matchesCategory && matchesSearch
        })
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    }

    return mockTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.date)
      const matchesDate = transactionDate >= startDate
      const matchesType = transactionTypeFilter === 'all' || transaction.type === transactionTypeFilter
      const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter
      const matchesSearch = searchTerm === '' || 
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesDate && matchesType && matchesCategory && matchesSearch
    })
  }

  // CÁLCULOS PRINCIPAIS - Usando todas as transações para o dashboard principal
  const allTransactions = mockTransactions
  const totalIncome = allTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = allTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpenses

  // Para o extrato, usar transações filtradas
  const filteredTransactions = getFilteredTransactions()
  const filteredIncome = filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const filteredExpenses = filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  const filteredBalance = filteredIncome - filteredExpenses

  // Preparar dados para o gráfico de pizza (apenas despesas)
  const expenseCategories = mockCategories.filter(cat => cat.type === 'expense' && cat.spent > 0)
  const pieChartData = expenseCategories.map(category => ({
    name: category.name,
    value: category.spent,
    color: category.color
  }))

  // Função para renderizar tooltip customizado
  const renderTooltip = (props: any) => {
    if (props.active && props.payload && props.payload.length) {
      const data = props.payload[0]
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-black">{data.name}</p>
          <p className="text-sm text-gray-600">
            R$ {data.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-500">
            {((data.value / pieChartData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}% do total
          </p>
        </div>
      )
    }
    return null
  }

  // Função para abrir detalhes da transação
  const openTransactionDetail = (transaction: any) => {
    setSelectedTransaction(transaction)
    setIsTransactionDetailOpen(true)
  }

  // Função para obter ícone da categoria
  const getCategoryIcon = (category: string) => {
    const categoryData = mockCategories.find(cat => cat.name === category)
    return categoryData?.icon || '💰'
  }

  // Lista de ícones disponíveis para categorias
  const availableIcons = [
    '💰', '🍽️', '🚗', '🏠', '🎬', '⚕️', '💼', '💻', '📈', '🛒', 
    '✈️', '🎓', '👕', '📱', '🏋️', '🎵', '📚', '🎮', '🍕', '☕',
    '💡', '🌐', '💧', '📺', '🔧', '🎨', '📷', '🎯', '🌟', '⚡'
  ]

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
                    onClick={() => {
                      setActiveSection('contas-planejadas')
                    }}
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
            <CardTitle className="text-black flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Gastos por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={renderTooltip} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry) => (
                    <span style={{ color: entry.color, fontSize: '12px' }}>
                      {value}
                    </span>
                  )}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            
            {/* Resumo das categorias */}
            <div className="mt-4 space-y-2">
              {pieChartData.map((category, index) => {
                const percentage = ((category.value / pieChartData.reduce((sum, item) => sum + item.value, 0)) * 100)
                return (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-gray-700">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-black">
                        R$ {category.value.toLocaleString('pt-BR')}
                      </span>
                      <span className="text-gray-500 ml-2">
                        ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orçamentos */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-black">Controle de Orçamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCategories.map((category) => {
              // Para categorias de receita (income), mostrar receita recebida vs meta
              const isIncome = category.type === 'income'
              const received = isIncome 
                ? allTransactions.filter(t => t.type === 'income' && t.category === category.name).reduce((sum, t) => sum + t.amount, 0)
                : 0
              
              const value = isIncome ? received : category.spent
              const target = category.budget
              const percentage = target > 0 ? (value / target) * 100 : 0
              const isOverBudget = !isIncome && percentage > 100
              
              return (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{category.icon}</span>
                      <span className="text-sm font-medium text-black">{category.name}</span>
                      {isIncome && <Badge variant="outline" className="text-xs">Receita</Badge>}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        R$ {value.toLocaleString('pt-BR')} / R$ {target.toLocaleString('pt-BR')}
                      </span>
                      {isOverBudget ? (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className="h-2"
                      style={{
                        backgroundColor: '#e5e7eb'
                      }}
                    />
                    <div 
                      className="absolute top-0 left-0 h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor: isOverBudget ? '#ef4444' : category.color
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    {percentage.toFixed(1)}% {isIncome ? 'da meta de receita' : 'do orçamento utilizado'}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContasPlanejadas = () => {
    const today = new Date().getDate()
    const totalMonthly = recurringBills.filter(b => b.active).reduce((sum, b) => sum + b.amount, 0)
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-black">Contas Planejadas</h2>
            <p className="text-sm text-gray-600 mt-1">Gerencie suas contas recorrentes mensais</p>
          </div>
          <Dialog open={isAddRecurringBillOpen} onOpenChange={setIsAddRecurringBillOpen}>
            <DialogTrigger asChild>
              <Button 
                style={{ backgroundColor: AXIS_GREEN }}
                className="text-white hover:opacity-90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Conta
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Adicionar Conta Recorrente</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bill-name">Nome da Conta *</Label>
                  <Input 
                    id="bill-name" 
                    placeholder="Ex: Conta de Luz, Internet..." 
                    value={newRecurringBill.name}
                    onChange={(e) => setNewRecurringBill(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bill-amount">Valor (R$) *</Label>
                    <Input 
                      id="bill-amount" 
                      placeholder="0,00" 
                      value={newRecurringBill.amount}
                      onChange={(e) => setNewRecurringBill(prev => ({ ...prev, amount: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bill-day">Dia do Vencimento *</Label>
                    <Input 
                      id="bill-day" 
                      type="number" 
                      min="1" 
                      max="31" 
                      placeholder="1-31" 
                      value={newRecurringBill.dueDay}
                      onChange={(e) => setNewRecurringBill(prev => ({ ...prev, dueDay: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bill-category">Categoria *</Label>
                  <Select value={newRecurringBill.category} onValueChange={(value) => setNewRecurringBill(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCategories.filter(c => c.type === 'expense').map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Ícone</Label>
                  <div className="grid grid-cols-10 gap-2 mt-2 max-h-32 overflow-y-auto p-2 border rounded-lg">
                    {availableIcons.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setNewRecurringBill(prev => ({ ...prev, icon }))}
                        className={`text-2xl p-2 rounded hover:bg-gray-100 transition-colors ${
                          newRecurringBill.icon === icon ? 'bg-gray-200 ring-2 ring-green-500' : ''
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsAddRecurringBillOpen(false)
                      resetRecurringBillForm()
                    }}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleAddRecurringBill}
                    style={{ backgroundColor: AXIS_GREEN }}
                    className="flex-1 text-white hover:opacity-90"
                    disabled={!newRecurringBill.name || !newRecurringBill.amount || !newRecurringBill.dueDay || !newRecurringBill.category}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black flex items-center gap-2">
              <Repeat className="h-5 w-5" style={{ color: AXIS_GREEN }} />
              Resumo Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-black">
              R$ {totalMonthly.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {recurringBills.filter(b => b.active).length} contas ativas
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-0">
            {recurringBills.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Repeat className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">Nenhuma conta planejada</p>
                <p className="text-sm">Adicione suas contas recorrentes para receber lembretes automáticos</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {recurringBills.map((bill) => {
                  const daysUntilDue = bill.dueDay - today
                  const isUpcoming = daysUntilDue >= 0 && daysUntilDue <= 3
                  const isLate = daysUntilDue < 0
                  const isDueToday = daysUntilDue === 0
                  
                  return (
                    <div 
                      key={bill.id} 
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        !bill.active ? 'opacity-50' : ''
                      } ${
                        isLate ? 'bg-red-50' : isUpcoming ? 'bg-yellow-50' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="p-2 rounded-full text-lg" style={{ backgroundColor: `${AXIS_GREEN}20` }}>
                            {bill.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-black">{bill.name}</p>
                              {isDueToday && (
                                <Badge className="bg-orange-500 text-white">Vence Hoje!</Badge>
                              )}
                              {isLate && (
                                <Badge className="bg-red-500 text-white">Atrasada</Badge>
                              )}
                              {isUpcoming && !isDueToday && (
                                <Badge className="bg-yellow-500 text-white">Próxima</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span>{bill.category}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Dia {bill.dueDay}
                              </span>
                              {isLate && (
                                <>
                                  <span>•</span>
                                  <span className="text-red-600 font-medium">
                                    {Math.abs(daysUntilDue)} dia{Math.abs(daysUntilDue) > 1 ? 's' : ''} de atraso
                                  </span>
                                </>
                              )}
                              {isUpcoming && !isDueToday && (
                                <>
                                  <span>•</span>
                                  <span className="text-yellow-600 font-medium">
                                    Vence em {daysUntilDue} dia{daysUntilDue > 1 ? 's' : ''}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="font-semibold text-lg text-black">
                              R$ {bill.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                            <p className="text-xs text-gray-500">por mês</p>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleRecurringBill(bill.id)}
                              className="h-8 w-8 p-0"
                            >
                              {bill.active ? <Eye className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteRecurringBill(bill.id)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderEntradas = () => {
    const incomeTransactions = mockTransactions.filter(t => t.type === 'income')
    const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0)
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-black">Entradas</h2>
          <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
            <DialogTrigger asChild>
              <Button 
                style={{ backgroundColor: AXIS_GREEN }}
                className="text-white hover:opacity-90"
                onClick={() => setNewTransaction(prev => ({ ...prev, type: 'income' }))}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Entrada
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Adicionar Entrada</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="amount" className="text-sm font-medium">Valor *</Label>
                    <Input 
                      id="amount" 
                      placeholder="0,00" 
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="category" className="text-sm font-medium">Categoria *</Label>
                  <Select value={newTransaction.category} onValueChange={(value) => setNewTransaction(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCategories.filter(c => c.type === 'income').map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-sm font-medium">Descrição *</Label>
                  <Input 
                    id="description" 
                    placeholder="Ex: Salário, Freelance, Dividendos..." 
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="date" className="text-sm font-medium">Data</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="method" className="text-sm font-medium">Método de Recebimento</Label>
                  <Select value={newTransaction.method} onValueChange={(value) => setNewTransaction(prev => ({ ...prev, method: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PIX">PIX</SelectItem>
                      <SelectItem value="TED">TED</SelectItem>
                      <SelectItem value="Transferência">Transferência</SelectItem>
                      <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsAddTransactionOpen(false)
                      resetTransactionForm()
                    }}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleAddTransaction}
                    style={{ backgroundColor: AXIS_GREEN }}
                    className="flex-1 text-white hover:opacity-90"
                    disabled={!newTransaction.amount || !newTransaction.category || !newTransaction.description}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black flex items-center gap-2">
              <TrendingUpIcon className="h-5 w-5" style={{ color: AXIS_GREEN }} />
              Total de Entradas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: AXIS_GREEN }}>
              +R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-gray-500 mt-1">{incomeTransactions.length} transações</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-0">
            {incomeTransactions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <TrendingUpIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">Nenhuma entrada registrada</p>
                <p className="text-sm">Adicione sua primeira entrada clicando no botão acima</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {incomeTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                       onClick={() => openTransactionDetail(transaction)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-full text-lg" style={{ backgroundColor: `${AXIS_GREEN}20` }}>
                          {getCategoryIcon(transaction.category)}
                        </div>
                        <div>
                          <p className="font-medium text-black">{transaction.description}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{transaction.category}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {transaction.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg" style={{ color: AXIS_GREEN }}>
                          +R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
                          <span>{new Date(transaction.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderSaidas = () => {
    const expenseTransactions = mockTransactions.filter(t => t.type === 'expense')
    const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0)
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-black">Saídas</h2>
          <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => setNewTransaction(prev => ({ ...prev, type: 'expense' }))}
              >
                <Minus className="h-4 w-4 mr-2" />
                Nova Saída
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Adicionar Saída</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="amount" className="text-sm font-medium">Valor *</Label>
                    <Input 
                      id="amount" 
                      placeholder="0,00" 
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="category" className="text-sm font-medium">Categoria *</Label>
                  <Select value={newTransaction.category} onValueChange={(value) => setNewTransaction(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCategories.filter(c => c.type === 'expense').map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-sm font-medium">Descrição *</Label>
                  <Input 
                    id="description" 
                    placeholder="Ex: Supermercado, Combustível, Aluguel..." 
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="date" className="text-sm font-medium">Data</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="location" className="text-sm font-medium">Local</Label>
                  <Input 
                    id="location" 
                    placeholder="Ex: Shopping Center, Posto Shell..." 
                    value={newTransaction.location}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="method" className="text-sm font-medium">Método de Pagamento</Label>
                  <Select value={newTransaction.method} onValueChange={(value) => setNewTransaction(prev => ({ ...prev, method: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PIX">PIX</SelectItem>
                      <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                      <SelectItem value="Cartão de Débito">Cartão de Débito</SelectItem>
                      <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                      <SelectItem value="Débito Automático">Débito Automático</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsAddTransactionOpen(false)
                      resetTransactionForm()
                    }}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleAddTransaction}
                    className="flex-1 bg-red-600 text-white hover:bg-red-700"
                    disabled={!newTransaction.amount || !newTransaction.category || !newTransaction.description}
                  >
                    <Minus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black flex items-center gap-2">
              <TrendingDownIcon className="h-5 w-5 text-red-600" />
              Total de Saídas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              -R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-gray-500 mt-1">{expenseTransactions.length} transações</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-0">
            {expenseTransactions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <TrendingDownIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">Nenhuma saída registrada</p>
                <p className="text-sm">Adicione sua primeira saída clicando no botão acima</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {expenseTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                       onClick={() => openTransactionDetail(transaction)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-full text-lg bg-red-100">
                          {getCategoryIcon(transaction.category)}
                        </div>
                        <div>
                          <p className="font-medium text-black">{transaction.description}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{transaction.category}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {transaction.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg text-red-600">
                          -R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
                          <span>{new Date(transaction.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderRelatorios = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Relatórios</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Resumo Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total de Entradas</span>
                <span className="font-bold" style={{ color: AXIS_GREEN }}>
                  +R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total de Saídas</span>
                <span className="font-bold text-red-600">
                  -R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="text-gray-900 font-medium">Saldo Final</span>
                <span className={`font-bold text-xl ${balance >= 0 ? '' : 'text-red-600'}`} style={balance >= 0 ? { color: AXIS_GREEN } : {}}>
                  {balance >= 0 ? '+' : ''}R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Exportar Relatórios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full border-gray-300 text-black hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
            <Button variant="outline" className="w-full border-gray-300 text-black hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Exportar PDF
            </Button>
            <Button variant="outline" className="w-full border-gray-300 text-black hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Exportar Excel
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderConfiguracoes = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Configurações</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" defaultValue="João Silva" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="joao@email.com" />
            </div>
            <Button style={{ backgroundColor: AXIS_GREEN }} className="text-white hover:opacity-90">
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Metas Financeiras</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="savings-goal">Meta de Economia Mensal (%)</Label>
              <Input id="savings-goal" type="number" defaultValue="20" />
            </div>
            <div>
              <Label htmlFor="emergency-fund">Fundo de Emergência (R$)</Label>
              <Input id="emergency-fund" defaultValue="10000" />
            </div>
            <Button style={{ backgroundColor: AXIS_GREEN }} className="text-white hover:opacity-90">
              Atualizar Metas
            </Button>
          </CardContent>
        </Card>
      </div>
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
                setActiveSection('mercado')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === 'mercado'
                  ? 'text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              style={activeSection === 'mercado' ? { backgroundColor: AXIS_GREEN } : {}}
            >
              <BarChart3 className="h-5 w-5" />
              <span className="font-medium">Mercado</span>
            </button>

            <button
              onClick={() => {
                setActiveSection('entradas')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === 'entradas'
                  ? 'text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              style={activeSection === 'entradas' ? { backgroundColor: AXIS_GREEN } : {}}
            >
              <TrendingUpIcon className="h-5 w-5" />
              <span className="font-medium">Entradas</span>
            </button>

            <button
              onClick={() => {
                setActiveSection('saidas')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === 'saidas'
                  ? 'text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              style={activeSection === 'saidas' ? { backgroundColor: AXIS_GREEN } : {}}
            >
              <TrendingDownIcon className="h-5 w-5" />
              <span className="font-medium">Saídas</span>
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
                <Badge className="ml-auto bg-red-500 text-white">{notifications.length}</Badge>
              )}
            </button>

            <button
              onClick={() => {
                setActiveSection('relatorios')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === 'relatorios'
                  ? 'text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              style={activeSection === 'relatorios' ? { backgroundColor: AXIS_GREEN } : {}}
            >
              <FileText className="h-5 w-5" />
              <span className="font-medium">Relatórios</span>
            </button>

            <button
              onClick={() => {
                setActiveSection('configuracoes')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === 'configuracoes'
                  ? 'text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              style={activeSection === 'configuracoes' ? { backgroundColor: AXIS_GREEN } : {}}
            >
              <Settings className="h-5 w-5" />
              <span className="font-medium">Configurações</span>
            </button>
          </div>
        </nav>

        {/* WhatsApp Button */}
        <div className="p-4 border-t border-gray-200">
          <button 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: AXIS_GREEN }}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="font-medium">Abrir WhatsApp</span>
          </button>
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
          {activeSection === 'mercado' && renderDashboard()}
          {activeSection === 'entradas' && renderEntradas()}
          {activeSection === 'saidas' && renderSaidas()}
          {activeSection === 'contas-planejadas' && renderContasPlanejadas()}
          {activeSection === 'relatorios' && renderRelatorios()}
          {activeSection === 'configuracoes' && renderConfiguracoes()}
        </div>
      </main>

      {/* Modal de Detalhes da Transação */}
      <Dialog open={isTransactionDetailOpen} onOpenChange={setIsTransactionDetailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">{selectedTransaction && getCategoryIcon(selectedTransaction.category)}</span>
              Detalhes da Transação
            </DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="text-center py-4">
                <p className={`text-3xl font-bold ${
                  selectedTransaction.type === 'income' ? '' : 'text-red-600'
                }`} style={selectedTransaction.type === 'income' ? { color: AXIS_GREEN } : {}}>
                  {selectedTransaction.type === 'income' ? '+' : '-'}R$ {selectedTransaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-lg font-medium text-black mt-2">{selectedTransaction.description}</p>
              </div>
              
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Categoria:</span>
                  <span className="font-medium text-black">{selectedTransaction.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data:</span>
                  <span className="font-medium text-black">
                    {new Date(selectedTransaction.date).toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Horário:</span>
                  <span className="font-medium text-black">{selectedTransaction.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Local:</span>
                  <span className="font-medium text-black">{selectedTransaction.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Método:</span>
                  <span className="font-medium text-black">{selectedTransaction.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge style={{ backgroundColor: `${AXIS_GREEN}20`, color: AXIS_GREEN }}>
                    ✓ Concluída
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
