import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CurrencyConverter } from "../features/converter/components/CurrencyConverter";

const queryClient = new QueryClient();
queryClient.setDefaultOptions({
  queries: {
    retry: 1,
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-svh justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-xl">
          <h1 className="mb-6 text-2xl font-semibold">Currency Converter</h1>
          <CurrencyConverter />
        </div>
      </main>
    </QueryClientProvider>
  );
}

export default App;
