import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { Input, Select, ErrorMessage } from "@shared/components";
import { type Option } from "@shared/types";
import { useDebounce } from "@shared/hooks";
import { useCurrencies, useConversion } from "../../hooks";
import { convertCurrenciesToOptions } from "../../utils";

const AMOUNT_PATTERN = /^\d*[.]?\d*$/;

export const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const {
    data: currencies,
    isLoading: isCurrenciesLoading,
    isError: isCurrenciesError,
  } = useCurrencies();

  const currencyOptions: Option[] = convertCurrenciesToOptions(currencies || []);

  const debouncedAmount = useDebounce(amount, 500);

  const {
    data: conversion,
    isLoading: isConversionLoading,
    isError: isConversionError,
  } = useConversion({
    from: fromCurrency,
    to: toCurrency,
    amount: Number(debouncedAmount),
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (AMOUNT_PATTERN.test(next)) {
      setAmount(next);
    }
  };

  const getCurrencyPrecision = (currency: string) => {
    const currencyData = currencies?.find((c) => c.short_code === currency);
    return currencyData?.precision ?? 2;
  };

  return (
    <div className="flex flex-col gap-4">
      {isCurrenciesError && <ErrorMessage message="Failed to load currencies" />}
      <div className="flex gap-4">
        <Input
          value={amount}
          onChange={handleAmountChange}
          label="Amount"
          id="amount"
          type="text"
          inputMode="decimal"
        />
        <Select
          options={currencyOptions}
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          label="From"
          id="from"
          disabled={isCurrenciesLoading}
        />
      </div>
      <div className="flex gap-4 align-center">
        {isConversionLoading || (amount !== debouncedAmount && fromCurrency && toCurrency) ? (
          <ClipLoader color="#000" size={20} />
        ) : isConversionError ? (
          <ErrorMessage message="Failed to convert currencies" />
        ) : (
          <span>{conversion?.value.toFixed(getCurrencyPrecision(toCurrency)) || 0}</span>
        )}
        <Select
          options={currencyOptions}
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          label="To"
          id="to"
          disabled={isCurrenciesLoading}
        />
      </div>
    </div>
  );
};
