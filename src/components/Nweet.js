import { dbService } from "FBInstance";
import { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [isEditing, setEditing] = useState(false);
  const [newText, setNewText] = useState(nweetObj.text);

  const onDeleteNweet = async () => {
    const isDelete = window.confirm("Are you sure delete this nweet?");
    if (isDelete) {
      //await dbService.collection(`nweets`).doc(nweetObj.id).delete();
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  };

  const onToggleEditing = (event) => {
    setEditing((prev) => !prev);
    if (!isEditing) setNewText(nweetObj.text);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewText(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService
      .collection("nweets")
      .doc(nweetObj.id)
      .update({ text: newText });
    setEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={newText}
              onChange={onChange}
              placeholder="Update Nweet"
              required
            />
            <input type="submit" value="Update Nweet" />
            <button onClick={onToggleEditing}>Cancel</button>
          </form>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteNweet}>Delete Nweet</button>
              <button onClick={onToggleEditing}>Update Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
