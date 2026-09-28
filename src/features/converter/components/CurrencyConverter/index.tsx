import { useState } from "react";
import { Select, ErrorMessage, Button, Spinner } from "@shared/components";
import { type Option } from "@shared/types";
import { useDebounce } from "@shared/hooks";
import { useCurrencies, useConversion } from "../../hooks";
import { convertCurrenciesToOptions } from "../../utils";
import { AmountInput } from "../AmountInput";

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

  const getCurrencyPrecision = (currency: string) => {
    const currencyData = currencies?.find((c) => c.short_code === currency);
    return currencyData?.precision ?? 2;
  };

  const handleSwapClick = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {isCurrenciesError && (
        <div className="rounded-lg px-3 py-2">
          <ErrorMessage message="Failed to load currencies" />
        </div>
      )}
      <div className="grid gap-3 grid-cols-2">
        <AmountInput value={amount} onChange={setAmount} />
        <Select
          options={currencyOptions}
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          label="From"
          id="from"
          disabled={isCurrenciesLoading}
        />
      </div>
      <Button
        onClick={handleSwapClick}
        disabled={!(fromCurrency || toCurrency) || isCurrenciesLoading}
        aria-label="Swap currencies"
        title="Swap currencies"
        className="self-center"
      >
        ⇅
      </Button>
      <div className="grid gap-3 grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-gray-700">Converted amount</span>
          <div
            className="flex h-11 items-center rounded-lg border border-gray-200 bg-gray-50 px-3 text-lg font-medium text-gray-900"
            aria-live="polite"
          >
            {isConversionLoading || (amount !== debouncedAmount && fromCurrency && toCurrency) ? (
              <Spinner />
            ) : isConversionError ? (
              <ErrorMessage message="Failed to convert currencies" />
            ) : (
              <span>{conversion?.value.toFixed(getCurrencyPrecision(toCurrency)) || 0}</span>
            )}
          </div>
        </div>
        <Select
          options={currencyOptions}
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          label="To"
          id="to"
          disabled={isCurrenciesLoading}
        />
      </div>
    </section>
  );
};
