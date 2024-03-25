import { useEffect } from "react";
import CmpClubs from "../components/Clubs/Clubs";

const Clubs = ({setCurrentPage = null, clubs = null, setClubType = null, deleteMessage = null, clubTypes = null}) => {
  useEffect(() => {
    if (setCurrentPage) {
      setCurrentPage('clubs');
    }
  });

  return (
    <section className="clubs">
      <div className="clubs__container container">
        <CmpClubs clubs={clubs} setClubType={setClubType} deleteMessage={deleteMessage} clubTypes={clubTypes} />
      </div>
    </section>
  )
};

export default Clubs;