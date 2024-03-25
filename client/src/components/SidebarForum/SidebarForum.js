import Select from "../Select/Select";
import { useEffect, useState } from "react";

import './SidebarForum.scss';
const SidebarForum = ({interestLists, coCurricularLists, toggleFilter}) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (types?.interest || types?.curricular) {
      toggleFilter && toggleFilter(types?.interest, types?.curricular);
    }
  }, [types]);
  
  return (
    <div className="sidebar__content">
      <h1>CLUB FOR CUBS</h1>
      <input type="search" placeholder="Search clubs" />
      <Select isForum={true} options={coCurricularLists} id={"curricular"} setTypes={setTypes}/>
      <Select isForum={true} options={interestLists} id={"interest"} setTypes={setTypes}/>
    </div>
  )
}

export default SidebarForum;