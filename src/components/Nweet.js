import { dbService, storageService } from "FBInstance";
import { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  // Nweet이 수정중 상태인지 판별하는 Hook
  const [isEditing, setEditing] = useState(false);
  // Nweet의 수정값에 대한 Hook
  const [newText, setNewText] = useState(nweetObj.text);

  // Nweet의 삭제 버튼 이벤트
  const onDeleteNweet = async (event) => {
    const isDelete = window.confirm("Are you sure delete this nweet?");
    if (isDelete) {
      //await dbService.collection(`nweets`).doc(nweetObj.id).delete();
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  };

  // Edit 상태에 대한 토글 함수
  const onToggleEditing = (event) => {
    setEditing((prev) => !prev);
    if (!isEditing) setNewText(nweetObj.text);
  };

  // input 값의 change 이벤트
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewText(value);
  };

  // form 의 submit 함수 - nweet 수정
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
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
          )}
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
