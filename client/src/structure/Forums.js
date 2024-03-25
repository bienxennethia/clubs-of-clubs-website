import { useEffect, useState } from "react";
import ForumsContent from "../components/ForumsContent/ForumsContent";
import SidebarForum from "../components/SidebarForum/SidebarForum";


const Forums = ({ toggleModal, forums = null, clubs = null, setCurrentPage = null,  toggleFilter }) => {
  const [interestLists, setInterestLists] = useState([]);
  const [coCurricularLists, setCoCurricularLists] = useState([]);

  useEffect(() => {
    if (setCurrentPage) {
      setCurrentPage('forums');
    }

    if (clubs) {
      const interestClubs = clubs.filter(club => club.type_name === "Interest");
      const coCurricularClubs = clubs.filter(club => club.type_name === "Co-Curricular");
      setInterestLists([{ id: 'all', name: 'Interest' }, ...interestClubs]);
      setCoCurricularLists([{ id: 'all', name: 'Co-Curricular' }, ...coCurricularClubs]);
    }
  }, [clubs, setCurrentPage]);

  return (
    <section className="forums noBackground">
      <div className="forums__container container">
        <SidebarForum interestLists={interestLists} coCurricularLists={coCurricularLists} toggleFilter={toggleFilter} />
        <ForumsContent toggleModal={toggleModal} forums={forums} />
      </div>
    </section>
  )
};

export default Forums;