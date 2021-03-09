import Nweet from "components/Nweet";

import { dbService, storageService } from "FBInstance";
import { useEffect, useState } from "react";
import NweetFactory from "components/NweetFactory";

const AppHome = ({ userObj }) => {
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

  return (
    <div>
      <NweetFactory userObj={userObj} />
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
