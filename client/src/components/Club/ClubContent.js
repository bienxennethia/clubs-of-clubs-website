import Forum from "../Forum/Forum";

const ClubContent = ({activeTab}) => {
  return (
    <div className="club__content">
      {activeTab ? (
        <div className="club__content-about">
          <p>Information & Background about club</p>
          <p>Vision & Mission Statement</p>
          <p>Officers</p>
        </div>
      ) : (
        <div className="club__content-forum">
          <Forum />
          <Forum />
        </div>
      )}
    </div>
  )
};

export default ClubContent;