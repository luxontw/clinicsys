import styles from "./App.module.css";
import { Routes, Route } from "solid-app-router";
import MainMenu from "./components/MainMenu";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import Oncall from "./pages/Oncall";
import { socket } from "./network/websocket";
import { onMount } from "solid-js";
import {
  memberStore,
  setMemberStore,
  memberStoreApi,
} from "./stores/memberStore";
import {
  waitinglistStore,
  setWaitinglistStore,
  waitinglistStoreApi,
} from "./stores/waitinglistStore";
import {
  editOneMemberStore,
  setEditOneMemberStore,
} from "./stores/editOneMemberStore";
import {
  editOneWaitinglistStore,
  setEditOneWaitinglistStore,
} from "./stores/editOneWaitinglistStore";

export default function App() {
  onMount(() => {
    socket.on("create-member", (data) => {
      console.log(`${socket.id} create a member:`, data);
      const newMembers = [...memberStore.members];
      newMembers.push(data.data);
      setEditOneMemberStore("mode", "text");
      setMemberStore({ members: newMembers });
    });
    socket.on("update-member", (data) => {
      console.log(`${socket.id} update a member:`, data);
      setEditOneMemberStore("mode", "text");
      setMemberStore("members", data.index, data.data);
    });
    socket.on("update-oncallMember", (data) => {
      console.log(`${socket.id} update oncallMember:`, data);
      setOncallMemberStore({ oncallMember: data.data });
    });
    socket.on("delete-member", (data) => {
      console.log(`${socket.id} delete a member:`, data);
      const newMembers = [...memberStore.members];
      newMembers.splice(data.index, 1);
      setMemberStore({ members: newMembers });
    });
    socket.on("create-waiting-member", (data) => {
      console.log(`${socket.id} create a waiting member:`, data);
      const newWaitinglist = [...waitinglistStore.waitinglist];
      newWaitinglist.push(data.data);
      setEditOneWaitinglistStore("mode", "text");
      setWaitinglistStore({ waitinglist: newWaitinglist });
    });
    socket.on("update-waitinglist", (data) => {
      console.log(`${socket.id} update waiting list:`, data);
      setEditOneWaitinglistStore("mode", "text");
      setWaitinglistStore("waitinglist", data.index, data.data);
    });
    socket.on("delete-waiting-member", (data) => {
      console.log(`${socket.id} delete waiting member:`, data);
      const newWaitinglist = [...waitinglistStore.waitinglist];
      newWaitinglist.splice(data.index, 1);
      setWaitinglistStore({ waitinglist: newWaitinglist });
    });
  });
  memberStoreApi.getAll();
  waitinglistStoreApi.getAll();
  return (
    <div class={styles.App}>
      <MainMenu />
      <header class={styles.header}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/appointment" element={<Appointment />}></Route>
          <Route path="/oncall" element={<Oncall />}></Route>
        </Routes>
      </header>
      <Footer />
    </div>
  );
}
