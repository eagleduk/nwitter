import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "FBInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

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
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          value={nweet}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          onChange={onChange}
          className="factoryInput__input"
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onChangeAttachment}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            width="50px"
            height="50px"
            alt=""
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onAttachmentClear}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
