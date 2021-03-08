import Nweet from "components/Nweet";
import { dbService } from "FBInstance";
import { useEffect, useState } from "react";

const AppHome = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const temp = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNweets(temp);
    });
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
      text: nweet,
      createAt: Date.now(),
      uid: userObj.uid,
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
        <Nweet
          key={nweet.id}
          nweetObj={nweet}
          isOwner={nweet.uid === userObj.uid}
        />
      ))}
    </div>
  );
};

export default AppHome;
