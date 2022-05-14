import { dogStore, setDogStore } from "../stores/dogStore";

const ShowDog = (props) => {
  return (
    <>
      共有 {dogStore.count} 隻 {dogStore.name} <br />
      年齡：{props.age} &nbsp 顏色：{props.color} <br />
      {props.children}
    </>
  );
};

export default ShowDog;
