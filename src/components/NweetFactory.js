import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "FBInstance";

const NweetFactory = ({ userObj }) => {
  // 새로운 nweet의 입력에 대한 Hook
  const [nweet, setNweet] = useState("");
  // 첨부 파일에 대한 Hook
  const [attachment, setAttachment] = useState(null);

  // form 의 submit 함수 - nweet 등록
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = null;
    if (attachment) {
      const attachmentRef = await storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const attachmentTemp = await attachmentRef.putString(
        attachment,
        "data_url"
      );
      attachmentUrl = await attachmentTemp.ref.getDownloadURL();
    }

    await dbService.collection("nweets").add({
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl: attachmentUrl ? attachmentUrl : null,
    });
    setNweet("");
    setAttachment(null);
  };

  // nweet의 input 입력 change 이벤트
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onChangeAttachment = (event) => {
    const {
      target: { files },
    } = event;
    const file = files[0];

    const reader = new FileReader();
    reader.onloadend = (finishEvent) => {
      const {
        target: { result },
      } = finishEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(file);
  };

  const onAttachmentClear = (event) => {
    setAttachment(null);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        value={nweet}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
        onChange={onChange}
      />
      <input type="file" accept="image/*" onChange={onChangeAttachment} />
      <input type="submit" value="Nweet" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" alt="" />
          <button onClick={onAttachmentClear}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
