import Select from "../Select/Select";

import './SidebarForum.scss';
const SidebarForum = ({interestLists, coCurricularLists, searchToggle = null, setCurricularType = null, setInterestType = null}) => {

  return (
    <div className="sidebar__content">
      <h1>CLUB FOR CUBS</h1>
      <input type="search" placeholder="Search clubs" onChange={(e) => searchToggle(e.target.value)}/>
      <Select isForum={true} options={coCurricularLists} setType={setCurricularType}/>
      <Select isForum={true} options={interestLists} setType={setInterestType}/>
    </div>
  )
}

export default SidebarForum;