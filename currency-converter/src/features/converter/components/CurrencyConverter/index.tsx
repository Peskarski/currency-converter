import { useState } from "react";
import { Input, Select } from "@shared/components";
import { type Option } from "@shared/types";
import { useDebounce } from "@shared/hooks";
import { useCurrencies, useConversion } from "../../hooks";
import { convertCurrenciesToOptions } from "../../utils";

export const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const { data: currencies } = useCurrencies();
  const currencyOptions: Option[] = convertCurrenciesToOptions(currencies || {});

  const debouncedAmount = useDebounce(amount, 500);

  const { data: conversion } = useConversion({
    from: fromCurrency,
    to: toCurrency,
    amount: debouncedAmount,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Input
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          label="Amount"
          id="amount"
          type="number"
          step="0.01"
        />
        <Select
          options={currencyOptions}
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          label="From"
        />
      </div>
      <div className="flex gap-4 align-center">
        <span>{conversion?.value.toFixed(2) || 0}</span>
        <Select
          options={currencyOptions}
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          label="To"
        />
      </div>
    </div>
  );
};
