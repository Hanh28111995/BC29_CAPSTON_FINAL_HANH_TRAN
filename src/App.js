import logo from "./logo.svg";
import "./App.css";
import { Button, Drawer } from "antd";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { Suspense, useState } from "react";
import { LoadingProvider } from "./contexts/loading.context";
import ModalEdit from "pages/Modal/ModalEdit";
import ModalDetailTask from "components/ModalCyber/ModalDetailTask";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <LoadingProvider>
          <ModalDetailTask/>
          <ModalEdit />
          <Router />
        </LoadingProvider>
      </Suspense>
    </BrowserRouter>
  );
}
/// cái nút Drawer button nó hiện mà modal nó ko chạy ấy, sửa ntn
export default App;
