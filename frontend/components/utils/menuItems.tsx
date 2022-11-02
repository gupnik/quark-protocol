// @ts-nocheck
import { MenuBook, Home, Group, TrendingUp, CalendarToday, Help} from '@mui/icons-material';
import { MenuItem } from '../../model/types';
import styles from '../../styles/modules/Shared.module.scss';

export const menuItems: MenuItem[] = [
  {
    icon: Home,
    link: '/home',
    label: 'Home'
  },
  {
    icon: MenuBook,
    link: '/myCourses',
    label: 'My Courses'
  },
  {
    icon: Group,
    link: '/myGroup',
    label: 'My Group'
  },
  {
    icon: TrendingUp,
    link: '/performance',
    label: 'My Performance'
  },
  {
    icon: CalendarToday,
    link: '/calendar',
    label: 'Calendar'
  },
  {
    icon: Help,
    link: '/help',
    label: 'Help',
    className: styles.mainMenuAlignBottom
  }
];
