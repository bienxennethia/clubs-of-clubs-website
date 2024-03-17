import ClubHeader from "../components/Club/ClubHeader";
import ClubContent from "../components/Club/ClubContent";
import { useState } from "react";
const Club = () => {
  const [activeTab, setActiveTab] = useState(true);

  const handleTabs = () => {
    setActiveTab(!activeTab);
  }

  return (
    <section className="club noBackground">
      <div className="club__container container">
        <ClubHeader handleTabs={handleTabs} activeTab={activeTab} />
        <ClubContent activeTab={activeTab} />
      </div>
    </section>
  )
};

export default Club;