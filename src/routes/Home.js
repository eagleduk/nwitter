import { dbService } from "FBInstance";
import { useState } from "react";

const AppHome = () => {
  const [nweet, setNweet] = useState("");

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweet").add({
      nweet,
      createAt: Date.now(),
    });
    setNweet("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          onChange={onChange}
        />
        <input type="submit" value="Nweet" />
      </form>
    </div>
  );
};

export default AppHome;
