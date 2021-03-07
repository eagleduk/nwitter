import { dbService } from "FBInstance";
import { useEffect, useState } from "react";

const AppHome = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const dbNweets = await dbService.collection("nweets").get();
    dbNweets.forEach((document) => {
      const temp = {
        ...document.data(),
        id: document.id,
      };
      setNweets((prev) => [temp, ...prev]);
    });
  };

  useEffect(() => {
    getNweets();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
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

      {nweets.map((nweet) => (
        <div key={nweet.id}>
          <h4>{nweet.nweet}</h4>
        </div>
      ))}
    </div>
  );
};

export default AppHome;
