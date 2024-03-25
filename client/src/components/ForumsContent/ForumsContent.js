import Forum from "../Forum/Forum";

import './ForumsContent.scss';

const ForumsContent = ({toggleModal, forums}) => {
  return (
    <div className="forums__content">
      {
        forums.map((forum) => (
          <Forum key={forum._id} toggleModal={toggleModal} forum={forum} />
        ))
      }
    </div>
  )
};

export default ForumsContent;