import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import { persistor, store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <App />
        <Toaster position="top-right" richColors />
      </Provider>
    </PersistGate>
  </QueryClientProvider>
);
