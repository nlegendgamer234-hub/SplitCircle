"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExpenseForm } from "./components/expense-form";
import { Card, CardContent } from "@/components/ui/card";

export default function NewExpensePage() {
  const router = useRouter();
  const [expenseType, setExpenseType] = useState("individual");

  return (
    <div className="container max-w-3xl mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight gradient-title">Add a new expense</h1>
        <p className="text-muted-foreground mt-1">Record a new expense to split with others</p>
      </div>

      <Card className="w-full">
        <CardContent className="pt-6">
          {/* Custom Tab Bar */}
          <div
            style={{
              display: "flex",
              width: "100%",
              backgroundColor: "#f1f5f9",
              padding: "4px",
              borderRadius: "8px",
              marginBottom: "24px",
              height: "44px",
            }}>
            <button
              type="button"
              onClick={() => setExpenseType("individual")}
              style={{
                flex: 1,
                height: "36px",
                fontSize: "14px",
                fontWeight: 500,
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                backgroundColor: expenseType === "individual" ? "#ffffff" : "transparent",
                color: expenseType === "individual" ? "#000000" : "#64748b",
                boxShadow: expenseType === "individual" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              }}>
              Individual Expense
            </button>
            <button
              type="button"
              onClick={() => setExpenseType("group")}
              style={{
                flex: 1,
                height: "36px",
                fontSize: "14px",
                fontWeight: 500,
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                backgroundColor: expenseType === "group" ? "#ffffff" : "transparent",
                color: expenseType === "group" ? "#000000" : "#64748b",
                boxShadow: expenseType === "group" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              }}>
              Group Expense
            </button>
          </div>

          {/* Render Active Form */}
          {expenseType === "individual" ? <ExpenseForm type="individual" onSuccess={(id) => router.push(id ? `/person/${id}` : "/dashboard")} /> : <ExpenseForm type="group" onSuccess={(id) => router.push(id ? `/groups/${id}` : "/dashboard")} />}
        </CardContent>
      </Card>
    </div>
  );
}
