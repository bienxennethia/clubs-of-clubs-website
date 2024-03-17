import ClubHeader from "../components/Club/ClubHeader";
import ClubContent from "../components/Club/ClubContent";
import { useLocation } from "react-router-dom";
import { useState } from "react";
const Club = () => {
  const location = useLocation();
  const isClub = location.pathname.includes("/club");
  const [activeTab, setActiveTab] = useState(true);

  const handleTabs = () => {
    setActiveTab(!activeTab);
  }

  return (
    <section className={isClub ? "club noBackground" : "club"}>
      <div className="club__container container">
        <ClubHeader handleTabs={handleTabs} activeTab={activeTab} />
        <ClubContent activeTab={activeTab} />
      </div>
    </section>
  )
};

export default Club;