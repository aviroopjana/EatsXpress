import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import { persistor, store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
      <Toaster position="top-right" richColors />
    </Provider>
  </PersistGate>
);
