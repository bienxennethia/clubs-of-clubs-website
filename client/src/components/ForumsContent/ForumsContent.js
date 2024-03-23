import Forum from "../Forum/Forum";

import './ForumsContent.scss';

const ForumsContent = ({toggleModal}) => {
  return (
    <div className="forums__content">
      <Forum toggleModal={toggleModal} />
      <Forum toggleModal={toggleModal} />
      <Forum toggleModal={toggleModal} />
      <Forum toggleModal={toggleModal} />
    </div>
  )
};

export default ForumsContent;