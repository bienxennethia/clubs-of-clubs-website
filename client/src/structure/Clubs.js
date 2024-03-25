import CmpClubs from "../components/Clubs/Clubs";

const Clubs = ({clubs = [], toggleFilter = null, deleteMessage = null}) => {
  return (
    <section className="clubs">
      <div className="clubs__container container">
        <CmpClubs clubs={clubs} toggleFilter={toggleFilter} deleteMessage={deleteMessage} />
      </div>
    </section>
  )
};

export default Clubs;