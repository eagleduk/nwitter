const Nweet = ({ nweetObj, isOwner }) => {
  console.log(isOwner);
  return (
    <div>
      <h4>{nweetObj.text}</h4>
      {isOwner && (
        <>
          <button>Delete Nweet</button>
          <button>Update Nweet</button>
        </>
      )}
    </div>
  );
};

export default Nweet;
