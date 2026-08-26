"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, ArrowLeftRight, ArrowLeft, Users } from "lucide-react";
import { ExpenseList } from "@/components/expense-list";
import { SettlementList } from "@/components/settlement-list";
import { GroupBalances } from "@/components/group-balances";
import { GroupMembers } from "@/components/group-members";

export default function GroupExpensesPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("expenses");

  const { data, isLoading } = useConvexQuery(api.groups.getGroupExpenses, {
    groupId: params.id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <BarLoader width={"100%"} color="#36d7b7" />
      </div>
    );
  }

  const group = data?.group;
  const members = data?.members || [];
  const expenses = data?.expenses || [];
  const settlements = data?.settlements || [];
  const balances = data?.balances || [];
  const userLookupMap = data?.userLookupMap || {};

  return (
    <div className="container mx-auto py-6 max-w-4xl px-4 space-y-6">
      {/* Header Section */}
      <div>
        <Button variant="outline" size="sm" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-4 rounded-md">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-emerald-600">{group?.name || "Group Details"}</h1>
              {group?.description && <p className="text-muted-foreground">{group.description}</p>}
              <p className="text-sm text-muted-foreground mt-1">
                {members.length} member{members.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={`/settlements/group/${params.id}`}>
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

      {/* Grid layout for balances & members */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Group Balances</CardTitle>
            </CardHeader>
            <CardContent>
              <GroupBalances balances={balances} />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Members</CardTitle>
            </CardHeader>
            <CardContent>
              <GroupMembers members={members} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs Container */}
      <div className="w-full">
        <div
          style={{
            display: "flex",
            width: "100%",
            backgroundColor: "#f1f5f9",
            padding: "4px",
            borderRadius: "8px",
            marginBottom: "16px",
          }}>
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

        {/* Tab Content Panes */}
        {activeTab === "expenses" && (
          <div className="w-full space-y-4">
            <ExpenseList expenses={expenses} showOtherPerson={true} isGroupExpense={true} userLookupMap={userLookupMap} />
          </div>
        )}

        {activeTab === "settlements" && (
          <div className="w-full space-y-4">
            <SettlementList settlements={settlements} isGroupSettlement={true} userLookupMap={userLookupMap} />
          </div>
        )}
      </div>
    </div>
  );
}
