import { Button, Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import AddBudgetModal from './components/AddBudgetModal';
import BudgetCard from './components/BudgetCard';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import { useState } from 'react';
import { UNCATERGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetContexts';
import AddExpensesModal from './components/AddExpensesModal';
import ViewExpensesModal from './components/ViewExpensesModal';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpensesModal, setShowAddExpensesModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpensesModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
  <>
   <Container className="my-4">
      <Stack direction="horizontal" gap="2" className="mb-4">
        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
        <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
      </Stack>
      <div style={{ 
      display:"grid", 
      gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", 
      gap:"1rem", 
      alignItems:"flex-start",
    }}>
      {budgets.map(budget => {
        const amount = getBudgetExpenses(budget.id).reduce(
        (total, expense) => total + expense.amount,
        0
        )
        return (
        <BudgetCard 
        key={budget.id}
        name={budget.name} 
        amount={amount} 
        max={budget.max} 
        onAddExpenseClick={() => openAddExpenseModal(budget.id)}
        onViewExpenseClick={() => setViewExpensesModalBudgetId(budget.id)}
        />
      )})}
      <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal}
      onViewExpenseClick={() => setViewExpensesModalBudgetId(UNCATERGORIZED_BUDGET_ID)} />
      <TotalBudgetCard />
    </div>
    </Container>
    <AddBudgetModal 
    show={showAddBudgetModal} 
    handleClose={() => setShowAddBudgetModal(false)} />
    <AddExpensesModal 
    show={showAddExpensesModal}
    defaultBudgetId={addExpenseModalBudgetId} 
    handleClose={() => setShowAddExpensesModal(false)} />
    <ViewExpensesModal 
    budgetId={viewExpensesModalBudgetId}
    handleClose={() => setViewExpensesModalBudgetId()} />
  </>
  )
}

export default App;
