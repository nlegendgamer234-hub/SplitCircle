"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { BarLoader } from "react-spinners";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, ArrowLeftRight, ArrowLeft } from "lucide-react";
import { ExpenseList } from "@/components/expense-list";
import { SettlementList } from "@/components/settlement-list";
import { useConvexQuery } from "../../../../hooks/use-convex-query";

export default function PersonExpensesPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("expenses");

  const { data, isLoading } = useConvexQuery(api.expenses.getExpensesBetweenUsers, {
    userId: params.id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <BarLoader width={"100%"} color="#36d7b7" />
      </div>
    );
  }

  const otherUser = data?.otherUser;
  const expenses = data?.expenses || [];
  const settlements = data?.settlements || [];
  const balance = data?.balance || 0;
  const targetUserId = otherUser?._id || otherUser?.id || params.id;

  return (
    <div className="container mx-auto py-6 max-w-4xl px-4">
      {/* Back Button & User Info Header */}
      <div className="mb-6">
        <Button variant="outline" size="sm" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-16 w-16">
              <AvatarImage src={otherUser?.imageUrl} />
              <AvatarFallback>{otherUser?.name?.charAt(0) || "?"}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-emerald-600">{otherUser?.name || "User"}</h1>
              <p className="text-muted-foreground">{otherUser?.email}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={`/settlements/user/${params.id}`}>
                <ArrowLeftRight className="mr-2 h-4 w-4" />
                Settle up
              </Link>
            </Button>
            <Button asChild className="bg-black text-white hover:bg-zinc-800">
              <Link href="/expenses/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add expense
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              {balance === 0 ? (
                <p>You are all settled up</p>
              ) : balance > 0 ? (
                <p>
                  <span className="font-medium">{otherUser?.name}</span> owes you
                </p>
              ) : (
                <p>
                  You owe <span className="font-medium">{otherUser?.name}</span>
                </p>
              )}
            </div>
            <div className={`text-2xl font-bold ${balance > 0 ? "text-emerald-600" : balance < 0 ? "text-red-600" : ""}`}>₹{Math.abs(balance).toFixed(2)}</div>
          </div>
        </CardContent>
      </Card>

      {/* Forced Native Tab Header */}
      <div className="w-full">
        <div style={{ display: "flex", width: "100%", backgroundColor: "#f1f5f9", padding: "4px", borderRadius: "8px", marginBottom: "16px" }}>
          <button
            type="button"
            onClick={() => setActiveTab("expenses")}
            style={{
              flex: 1,
              padding: "8px 0",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              backgroundColor: activeTab === "expenses" ? "#ffffff" : "transparent",
              color: activeTab === "expenses" ? "#000000" : "#64748b",
              boxShadow: activeTab === "expenses" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            }}>
            Expenses ({expenses.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("settlements")}
            style={{
              flex: 1,
              padding: "8px 0",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              backgroundColor: activeTab === "settlements" ? "#ffffff" : "transparent",
              color: activeTab === "settlements" ? "#000000" : "#64748b",
              boxShadow: activeTab === "settlements" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            }}>
            Settlements ({settlements.length})
          </button>
        </div>

        {/* Content Section */}
        {activeTab === "expenses" && (
          <div className="w-full space-y-4">
            <ExpenseList expenses={expenses} showOtherPerson={false} otherPersonId={params.id} userLookupMap={otherUser ? { [targetUserId]: otherUser } : {}} />
          </div>
        )}

        {activeTab === "settlements" && (
          <div className="w-full space-y-4">
            <SettlementList settlements={settlements} userLookupMap={otherUser ? { [targetUserId]: otherUser } : {}} />
          </div>
        )}
      </div>
    </div>
  );
}
