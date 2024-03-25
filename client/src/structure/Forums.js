import ForumsContent from "../components/ForumsContent/ForumsContent";
import SidebarContent from "../components/SidebarContent/SidebarContent";


const Forums = ({ toggleModal, forums }) => {
  return (
    <section className="forums noBackground">
      <div className="forums__container container">
        <SidebarContent />
        <ForumsContent toggleModal={toggleModal} forums={forums} />
      </div>
    </section>
  )
};

export default Forums;