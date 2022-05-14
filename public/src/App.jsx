import { Routes, Route } from "solid-app-router";

import { socket } from "./network/websocket";

import MainMenu from "./components/MainMenu";
import Queued from "./pages/Queued";
import Enqueue from "./pages/Enqueue";
import Dequeue from "./pages/Dequeue";

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
          <Route path="/" element={<Queued />}></Route>
          <Route path="/appointment" element={<Enqueue />}></Route>
          <Route path="/oncall" element={<Dequeue />}></Route>
        </Routes>
      </header>
    </div>
  );
}
