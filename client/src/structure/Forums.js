import { useEffect, useState } from "react";
import ForumsContent from "../components/ForumsContent/ForumsContent";
import SidebarForum from "../components/SidebarForum/SidebarForum";


const Forums = ({ toggleModal, forums = null, clubs = null, setCurrentPage = null, searchToggle = null, setCurricularType = null, setInterestType = null }) => {
  const [interestLists, setInterestLists] = useState([]);
  const [coCurricularLists, setCoCurricularLists] = useState([]);

  useEffect(() => {

    if (clubs) {
      const interestClubs = clubs.filter(club => club.type_name === "Interest");
      const coCurricularClubs = clubs.filter(club => club.type_name === "Co-Curricular");
      setInterestLists([{ id: 'all', name: 'Interest' }, ...interestClubs]);
      setCoCurricularLists([{ id: 'all', name: 'Co-Curricular' }, ...coCurricularClubs]);
    }
  }, [clubs]);

  useEffect(() => {
    if (setCurrentPage) {
      setCurrentPage('forums');
    } 
    setCurricularType('all');
    setInterestType('all');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCurrentPage]);

  return (
    <section className="forums noBackground">
      <div className="forums__container container">
        <SidebarForum interestLists={interestLists} coCurricularLists={coCurricularLists} searchToggle={searchToggle} setCurricularType={setCurricularType} setInterestType={setInterestType} />
        <ForumsContent toggleModal={toggleModal} forums={forums} />
      </div>
    </section>
  )
};

export default Forums;