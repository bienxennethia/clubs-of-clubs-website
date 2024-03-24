import { ReactComponent as Logo } from "../../icons/profile.svg";
import AdminBtn from "../AdminBtn/AdminBtn";
import './Club.scss';

const ClubHeader = ({handleTabs, activeTab, toggleModal, clubData = []}) => {

  return (
    <div className="club__content club__content-header">
      <div className="club__header-content">
        <div className="club__header-image">
          <Logo />
        </div>
        <div className="club__header-text">
          {console.log(clubData)}
          {
            clubData[0]?.name && <h2 className="club__header-title">{clubData[0]?.name}</h2>
          }
          { clubData[0]?.type_name && <p className="club__header-subtitle">{clubData[0]?.type_name}</p> }
          <p className="club__header-name">Moderator:</p>
          <AdminBtn editModal={toggleModal} editModalId="editClub" id={clubData[0]?.id}/>
        </div>
      </div>
      <div className={ activeTab ? `club__header-actions about` : 'club__header-actions forum'}>
        <button type="button" className={ activeTab ? `active` : ''} onClick={handleTabs}>ABOUT</button>
        <button type="button" className={ !activeTab ? `active` : ''} onClick={handleTabs}>FORUM</button>
      </div>
    </div>
  )
};

export default ClubHeader;