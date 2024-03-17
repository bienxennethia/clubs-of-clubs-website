import { ReactComponent as Logo } from "../../icons/profile.svg";
import './Forum.scss';
const Forum = () => {
  return (
    <div className="forum__items">
    <div className="forum__item">
      <div className="forum__header">
        <div className="forum__image">
          <Logo />
        </div>
        <div className="forum__text">
          <h2 className="forum__title">Bedan Society of Young Astronomers</h2>
          <p className="forum__subtitle">Mar 17, 2024 10:00 AM</p>
        </div>
      </div>
      <div className="forum__content">
        <p>Caption</p>
        <p>Caption</p>
        <p>Caption</p>
        <p>Caption</p>
      </div>
    </div>
  </div>
  )
};

export default Forum;