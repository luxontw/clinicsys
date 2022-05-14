import ShowDog from "../components/ShowDog";
import DogActionBtns from "../components/DogActionBtns";
import DogNameInput from "../components/DogNameInput";

// export 只有一個可以直接 export default
export default function Home() {
  return (
    <div>
      <h1>日資工二甲&nbsp;U0933030&nbsp;盧易賢</h1>
      <ShowDog age="16" color="Black" />
      <br />
      <DogActionBtns />
      <DogNameInput />
    </div>
  );
}
// export default Home;
