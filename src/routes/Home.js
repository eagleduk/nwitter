import Nweet from "components/Nweet";
import { dbService } from "FBInstance";
import { useEffect, useState } from "react";

const AppHome = ({ userObj }) => {
  // 새로운 nweet의 입력에 대한 Hook
  const [nweet, setNweet] = useState("");
  // 등록된 nweet 들의 리스트에 대한 Hook
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    // 등록된 nweet 의 상태를 감지
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const temp = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNweets(temp);
    });
  }, []);

  // nweet의 input 입력 change 이벤트
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  // form 의 submit 함수 - nweet 등록
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
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
          isOwner={nweet.creatorId === userObj.uid}
        />
      ))}
    </div>
  );
};

export default AppHome;
