import { dogStore, setDogStore } from "../stores/dogStore";
import { Button, ButtonGroup } from "solid-bootstrap";

export default function () {
  return (
    <>
      <ButtonGroup class="lg">
        <Button
          variant="primary"
          onClick={(e) => {
            setDogStore({ count: dogStore.count + 1 });
            //console.log(e.target);
            console.log(e.target.innerHTML);
          }}
        >
          +1
        </Button>
        <Button
          variant="success"
          onClick={(e) => setDogStore({ count: (dogStore.count = 0) })}
        >
          {dogStore.count}
        </Button>
        <Button
          variant="primary"
          onClick={(e) =>
            setDogStore({
              count: (dogStore.count > 0 && dogStore.count - 1) | 0,
            })
          }
        >
          -1
        </Button>
      </ButtonGroup>
    </>
  );
}
