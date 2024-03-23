import ForumsContent from "../components/ForumsContent/ForumsContent";
import SidebarContent from "../components/SidebarContent/SidebarContent";


const Forums = ({ toggleModal }) => {
  return (
    <section className="forums noBackground">
      <div className="forums__container container">
        <SidebarContent />
        <ForumsContent toggleModal={toggleModal} />
      </div>
    </section>
  )
};

export default Forums;