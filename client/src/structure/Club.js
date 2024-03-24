import ClubHeader from "../components/Club/ClubHeader";
import ClubContent from "../components/Club/ClubContent";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getClubs } from "../data/utils";

const Club = ({toggleModal}) => {
  const [activeTab, setActiveTab] = useState(true);
  const [clubData, setClubData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        if (id) {
          const club = await getClubs(id);
          setClubData(club);
        } else {
          const clubs = await getClubs();
          setClubData(clubs);
        }
      } catch (error) {
        console.error('Error fetching club:', error);
      }
    };

    fetchClubData();
  }, [id]);

  const handleTabs = () => {
    setActiveTab(!activeTab);
  }

  return (
    <section className="club noBackground">
      <div className="club__container container">
        <ClubHeader handleTabs={handleTabs} activeTab={activeTab} toggleModal={toggleModal} clubData={clubData} />
        <ClubContent activeTab={activeTab} clubData={clubData} />
      </div>
    </section>
  )
};

export default Club;