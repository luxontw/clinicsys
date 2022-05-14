import { Routes, Route } from "solid-app-router";

import { socket } from "./network/websocket";

import Home from "./pages/Home";
import MainMenu from "./components/MainMenu";
import Features from "./pages/Features";
import About from "./pages/About";
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
          <Route path="/features" element={<Features />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </header>
    </div>
  );
}
