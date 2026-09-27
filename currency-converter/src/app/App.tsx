import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CurrencyConverter } from "../features/converter/components/CurrencyConverter";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1 className="text-3xl font-bold">Currency Converter</h1>
      <CurrencyConverter />
    </QueryClientProvider>
  );
}

export default App;
