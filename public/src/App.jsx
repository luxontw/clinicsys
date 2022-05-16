import { Routes, Route } from "solid-app-router";

import { socket } from "./network/websocket";

import MainMenu from "./components/MainMenu";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import Oncall from "./pages/Oncall";

import styles from "./App.module.css";
import { onMount } from "solid-js";

export default function App() {
  onMount(() => {
    socket.on("update-member", (data) => {
      console.log(`${socket.id} update a member:`, data);
      alert(JSON.stringify(data, null, 2));
    });
    socket.on("delete-member", (data) => {
      console.log(`${socket.id} delete a member:`, data);
      alert(JSON.stringify(data, null, 2));
    });
  });
  return (
    <div class={styles.App}>
      <MainMenu></MainMenu>
      <header class={styles.header}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/appointment" element={<Appointment />}></Route>
          <Route path="/oncall" element={<Oncall />}></Route>
        </Routes>
      </header>
    </div>
  );
}
