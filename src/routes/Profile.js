import { authService } from "FBInstance";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, userUpdate }) => {
  const [displayName, setDisplayName] = useState(userObj.displayName);

  // const [nweets, setNweets] = useState([]);
  // const getMyNweets = async () => {
  //   const nweets = await dbService
  //     .collection("nweets")
  //     .where("creatorId", "==", userObj.uid)
  //     .orderBy("createAt", "desc")
  //     .get();
  //   const myNweets = nweets.docs.map((nweet) => {
  //     return {
  //       ...nweet.data(),
  //       id: nweet.id,
  //     };
  //   });
  //   setNweets(myNweets);
  // };

  // useEffect(() => {
  //   getMyNweets();
  // }, []);

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
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          value={displayName ? displayName : ""}
          required
          onChange={onChangeDisplayName}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
      {/* 
      {nweets.map((nweet) => (
        <Nweet
          key={nweet.id}
          nweetObj={nweet}
          isOwner={nweet.creatorId === userObj.uid}
        />
      ))} */}
    </div>
  );
};

export default Profile;
