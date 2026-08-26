"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export function SplitSelector({ type, amount, participants, paidByUserId, onSplitsChange }) {
  const { user } = useUser();
  const [splits, setSplits] = useState([]);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Helper function to prevent .toFixed() runtime errors on undefined/NaN
  const formatNum = (val, decimals = 2) => {
    const num = Number(val);
    return isNaN(num) ? (0).toFixed(decimals) : num.toFixed(decimals);
  };

  // Calculate splits when inputs change
  useEffect(() => {
    if (!amount || amount <= 0 || !participants || participants.length === 0) {
      return;
    }

    let newSplits = [];
    const parsedAmount = parseFloat(amount) || 0;

    if (type === "equal") {
      const shareAmount = parsedAmount / participants.length;
      newSplits = participants.map((participant) => ({
        userId: participant.id,
        name: participant.name,
        email: participant.email,
        imageUrl: participant.imageUrl,
        amount: shareAmount,
        percentage: 100 / participants.length,
        paid: participant.id === paidByUserId,
      }));
    } else if (type === "percentage") {
      const evenPercentage = 100 / participants.length;
      newSplits = participants.map((participant) => ({
        userId: participant.id,
        name: participant.name,
        email: participant.email,
        imageUrl: participant.imageUrl,
        amount: (parsedAmount * evenPercentage) / 100,
        percentage: evenPercentage,
        paid: participant.id === paidByUserId,
      }));
    } else if (type === "exact") {
      const evenAmount = parsedAmount / participants.length;
      newSplits = participants.map((participant) => ({
        userId: participant.id,
        name: participant.name,
        email: participant.email,
        imageUrl: participant.imageUrl,
        amount: evenAmount,
        percentage: parsedAmount > 0 ? (evenAmount / parsedAmount) * 100 : 0,
        paid: participant.id === paidByUserId,
      }));
    }

    setSplits(newSplits);

    // Calculate totals
    const newTotalAmount = newSplits.reduce((sum, split) => sum + (Number(split.amount) || 0), 0);
    const newTotalPercentage = newSplits.reduce((sum, split) => sum + (Number(split.percentage) || 0), 0);

    setTotalAmount(newTotalAmount);
    setTotalPercentage(newTotalPercentage);

    // Notify parent about split changes
    if (onSplitsChange) {
      onSplitsChange(newSplits);
    }
  }, [type, amount, participants, paidByUserId, onSplitsChange]);

  // Update percentage split
  const updatePercentageSplit = (userId, newPercentage) => {
    const parsedPercentage = parseFloat(newPercentage) || 0;
    const baseAmount = parseFloat(amount) || 0;

    const updatedSplits = splits.map((split) => {
      if (split.userId === userId) {
        return {
          ...split,
          percentage: parsedPercentage,
          amount: (baseAmount * parsedPercentage) / 100,
        };
      }
      return split;
    });

    setSplits(updatedSplits);

    // Recalculate totals
    const newTotalAmount = updatedSplits.reduce((sum, split) => sum + (Number(split.amount) || 0), 0);
    const newTotalPercentage = updatedSplits.reduce((sum, split) => sum + (Number(split.percentage) || 0), 0);

    setTotalAmount(newTotalAmount);
    setTotalPercentage(newTotalPercentage);

    if (onSplitsChange) {
      onSplitsChange(updatedSplits);
    }
  };

  // Update exact amount split
  const updateExactSplit = (userId, newAmount) => {
    const parsedAmount = parseFloat(newAmount) || 0;
    const baseAmount = parseFloat(amount) || 0;

    const updatedSplits = splits.map((split) => {
      if (split.userId === userId) {
        return {
          ...split,
          amount: parsedAmount,
          percentage: baseAmount > 0 ? (parsedAmount / baseAmount) * 100 : 0,
        };
      }
      return split;
    });

    setSplits(updatedSplits);

    // Recalculate totals
    const newTotalAmount = updatedSplits.reduce((sum, split) => sum + (Number(split.amount) || 0), 0);
    const newTotalPercentage = updatedSplits.reduce((sum, split) => sum + (Number(split.percentage) || 0), 0);

    setTotalAmount(newTotalAmount);
    setTotalPercentage(newTotalPercentage);

    if (onSplitsChange) {
      onSplitsChange(updatedSplits);
    }
  };

  // Check if totals are valid
  const baseAmount = parseFloat(amount) || 0;
  const isPercentageValid = Math.abs(totalPercentage - 100) < 0.01;
  const isAmountValid = Math.abs(totalAmount - baseAmount) < 0.01;

  return (
    <div className="space-y-4 mt-4">
      {splits.map((split) => (
        <div key={split.userId} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-[120px]">
            <Avatar className="h-7 w-7">
              <AvatarImage src={split.imageUrl} />
              <AvatarFallback>{split.name?.charAt(0) || "?"}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{split.userId === user?.id ? "You" : split.name}</span>
          </div>

          {type === "equal" && (
            <div className="text-right text-sm">
              ${formatNum(split.amount, 2)} ({formatNum(split.percentage, 1)}%)
            </div>
          )}

          {type === "percentage" && (
            <div className="flex items-center gap-4 flex-1">
              <Slider value={[split.percentage ?? 0]} min={0} max={100} step={1} onValueChange={(values) => updatePercentageSplit(split.userId, values[0])} className="flex-1" />
              <div className="flex gap-1 items-center min-w-[100px]">
                <Input type="number" min="0" max="100" value={split.percentage ?? 0} onChange={(e) => updatePercentageSplit(split.userId, e.target.value)} className="w-16 h-8" />
                <span className="text-sm text-muted-foreground">%</span>
                <span className="text-sm ml-1">${formatNum(split.amount, 2)}</span>
              </div>
            </div>
          )}

          {type === "exact" && (
            <div className="flex items-center gap-2 flex-1">
              <div className="flex-1"></div>
              <div className="flex gap-1 items-center">
                <span className="text-sm text-muted-foreground">$</span>
                <Input type="number" min="0" max={baseAmount * 2} step="0.01" value={split.amount ?? 0} onChange={(e) => updateExactSplit(split.userId, e.target.value)} className="w-24 h-8" />
                <span className="text-sm text-muted-foreground ml-1">({formatNum(split.percentage, 1)}%)</span>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Total row */}
      <div className="flex justify-between border-t pt-3 mt-3">
        <span className="font-medium">Total</span>
        <div className="text-right">
          <span className={`font-medium ${!isAmountValid ? "text-amber-600" : ""}`}>${formatNum(totalAmount, 2)}</span>
          {type !== "equal" && <span className={`text-sm ml-2 ${!isPercentageValid ? "text-amber-600" : ""}`}>({formatNum(totalPercentage, 1)}%)</span>}
        </div>
      </div>

      {/* Validation warnings */}
      {type === "percentage" && !isPercentageValid && <div className="text-sm text-amber-600 mt-2">The percentages should add up to 100%.</div>}

      {type === "exact" && !isAmountValid && (
        <div className="text-sm text-amber-600 mt-2">
          The sum of all splits (${formatNum(totalAmount, 2)}) should equal the total amount (${formatNum(baseAmount, 2)}).
        </div>
      )}
    </div>
  );
}
