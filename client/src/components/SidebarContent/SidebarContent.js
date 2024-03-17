import Select from "../Select/Select";

import clubs from "../Clubs/clubs-data";

import './SidebarContent.scss';
const SidebarContent = () => {
  const coCurricularClubs = clubs.filter(club => club.group === "Co-curricular");
const interestClubs = clubs.filter(club => club.group === "Interest");
  return (
    <div className="sidebar__content">
      <h1>CLUB FOR CUBS</h1>
      <input type="search" placeholder="Search clubs" />
      <Select isForum={true} data={coCurricularClubs} />
      <Select isForum={true} data={interestClubs}/>
    </div>
  )
}

export default SidebarContent;