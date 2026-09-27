import { useCurrencies } from "../../hooks";

export const CurrencyConverter = () => {
  const { data: currencies } = useCurrencies();

  console.log(currencies);

  return <input type="number" />;
};
