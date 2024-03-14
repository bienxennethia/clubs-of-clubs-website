import { ReactComponent as HomeIcon } from "../../icons/home.svg";
import { ReactComponent as ForumIcon } from "../../icons/forum.svg";
import { ReactComponent as ClubsIcon } from "../../icons/clubs.svg";
import { ReactComponent as AboutIcon } from "../../icons/about.svg";
export const navigationItems = [
  {
    name: "Home",
    link: "/",
    icon: <HomeIcon className="navigation__link--icon logo" />
  },
  {
    name: "Forums",
    link: "/forums",
    icon: <ForumIcon className="navigation__link--icon logo"/>
  },
  {
    name: "Clubs",
    link: "/clubs",
    icon: <ClubsIcon className="navigation__link--icon logo"/>
  },
  {
    name: "About",
    link: "/about",
    icon: <AboutIcon className="navigation__link--icon logo"/>
  }
];