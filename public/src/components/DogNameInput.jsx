import { dogStore, setDogStore } from "../stores/dogStore";
import { FormControl, InputGroup } from "solid-bootstrap";

export default function DogNameInput() {
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text>品種</InputGroup.Text>
        <FormControl
          placeholder="品種"
          onChange={(e) => {
            setDogStore({ name: e.currentTarget.value });
          }}
        />
      </InputGroup>
    </>
  );
}
