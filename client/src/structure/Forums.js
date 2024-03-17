import ForumsContent from "../components/ForumsContent/ForumsContent";
import SidebarContent from "../components/SidebarContent/SidebarContent";


const Forums = () => {
  return (
    <section className="forums noBackground">
      <div className="forums__container container">
        <SidebarContent />
        <ForumsContent />
      </div>
    </section>
  )
};

export default Forums;