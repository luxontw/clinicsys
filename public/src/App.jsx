import { Routes, Route } from "solid-app-router";
import { memberStore, setMemberStore } from "./stores/memberStore";
import { socket } from "./network/websocket";
import {
  editOneMemberStore,
  setEditOneMemberStore,
} from "./stores/editOneMemberStore";

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
      setEditOneMemberStore("mode", "text");
      setMemberStore("members", data.index, data.data);
    });
    socket.on("delete-member", (data) => {
      console.log(`${socket.id} delete a member:`, data);
      const newMembers = [...memberStore.members];
      newMembers.splice(data.index, 1);
      setMemberStore({ members: newMembers });
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
