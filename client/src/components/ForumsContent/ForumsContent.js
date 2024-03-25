import Forum from "../Forum/Forum";

import './ForumsContent.scss';

const ForumsContent = ({toggleModal, forums}) => {
  return (
    <div className="forums__content">
      {
        forums.length === 0 && (
          <div className="clubs__text">No forums found</div>
        )
      }
      {
        forums.map((forum, index) => (
          <Forum key={index} toggleModal={toggleModal} forum={forum} />
        ))
      }
    </div>
  )
};

export default ForumsContent;