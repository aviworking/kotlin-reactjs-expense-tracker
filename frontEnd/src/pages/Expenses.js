import CreateExpense from "../components/expenseComponents/CreateExpense";
import ListExpenses from "../components/expenseComponents/ListExpenses";

//Show expenses page.
const Expenses = () => {
  return (
    <>
      <CreateExpense />
      <ListExpenses />
    </>
  );
};

export default Expenses;
