import { useEffect } from "react";
import CmpClubs from "../components/Clubs/Clubs";

const Clubs = ({setCurrentPage = null, clubs = [], toggleFilter = null, deleteMessage = null, clubTypes = null}) => {
  useEffect(() => {
    if (setCurrentPage) {
      setCurrentPage('clubs');
    }
  });

  return (
    <section className="clubs">
      <div className="clubs__container container">
        <CmpClubs clubs={clubs} toggleFilter={toggleFilter} deleteMessage={deleteMessage} clubTypes={clubTypes} />
      </div>
    </section>
  )
};

export default Clubs;