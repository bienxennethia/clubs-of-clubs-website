import Forum from "../Forum/Forum";

const ClubContent = ({activeTab, clubData = null, forums = null, toggleModal = null}) => {
  return (
    <div className="club__content">
      {activeTab === 'about' ? (
        <div className="club__content-about">
          { clubData[0]?.description && <h1>ABOUT:</h1> }
          { clubData[0]?.description && <p>{clubData[0]?.description}</p> }
          { clubData[0]?.vision && <h1>VISION:</h1> }
          { clubData[0]?.vision && <p>{clubData[0]?.vision}</p> }
          { clubData[0]?.mission && <h1>MISSION:</h1> }
          { clubData[0]?.mission && <p>{clubData[0]?.mission}</p> }
        </div>
      ) : (
        <div className="club__content-forum">
          {
            forums.map((forum, index) => (
              <Forum key={index} toggleModal={toggleModal} forum={forum} />
            ))
          }
        </div>
      )}
    </div>
  )
};

export default ClubContent;