import Nweet from "components/Nweet";
import { authService, dbService } from "FBInstance";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, userUpdate }) => {
  const [displayName, setDisplayName] = useState(userObj.displayName);
  const [nweets, setNweets] = useState([]);
  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createAt", "desc")
      .get();
    const myNweets = nweets.docs.map((nweet) => {
      return {
        ...nweet.data(),
        id: nweet.id,
      };
    });
    setNweets(myNweets);
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  const history = useHistory();
  const onLogOutClick = (event) => {
    authService.signOut();
    history.push("/");
  };

  const onChangeDisplayName = (event) => {
    const {
      target: { value },
    } = event;
    setDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (displayName !== userObj.displayName) {
      const updateObj = {
        displayName: displayName,
      };
      await userObj.updateProfile(updateObj);
      userUpdate();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={displayName ? displayName : ""}
          required
          onChange={onChangeDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>

      {nweets.map((nweet) => (
        <Nweet
          key={nweet.id}
          nweetObj={nweet}
          isOwner={nweet.creatorId === userObj.uid}
        />
      ))}
    </>
  );
};

export default Profile;
