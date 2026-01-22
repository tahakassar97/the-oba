import { createElement, FC } from 'react';

import {
  Home,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Search,
  Plus,
  Trash,
  Users,
  MapPin,
  Calendar,
  Grid3X3,
  Globe,
  ArrowLeft,
  PlusCircle,
  Activity,
  Building,
  Tag,
  Sun,
  Moon,
  Bell,
  BellRing,
  LocationEdit,
  LucideProps,
  Star,
  Check,
  Book,
  Edit,
  XIcon,
  XCircle,
  RotateCcw,
  FileText,
  Send,
  Mail,
  PhoneCall,
  MessageCircle,
  UserPlus,
  ArrowRight,
  CreditCard,
  Banknote,
  TrendingDown,
  TrendingUp,
  MoveRight,
  UserRoundCog,
  Boxes,
  ShoppingBasket,
  Minus,
  ViewIcon,
} from 'lucide-react';

// Define your icon registry here
const iconRegistry = {
  home: Home,
  settings: Settings,
  menu: Menu,
  x: X,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  moreHorizontal: MoreHorizontal,
  search: Search,
  plus: Plus,
  trash: Trash,
  users: Users,
  mapPin: MapPin,
  calendar: Calendar,
  grid3x3: Grid3X3,
  globe: Globe,
  arrowLeft: ArrowLeft,
  plusCircle: PlusCircle,
  activity: Activity,
  building: Building,
  tag: Tag,
  bellRing: BellRing,
  bell: Bell,
  locationEdit: LocationEdit,
  star: Star,
  sun: Sun,
  moon: Moon,
  check: Check,
  book: Book,
  edit: Edit,
  close: XIcon,
  closeCircle: XCircle,
  retry: RotateCcw,
  fileText: FileText,
  send: Send,
  mail: Mail,
  phone: PhoneCall,
  message: MessageCircle,
  userPlus: UserPlus,
  arrowRight: ArrowRight,
  creditCard: CreditCard,
  banknote: Banknote,
  trendingDown: TrendingDown,
  trendingUp: TrendingUp,
  moveRight: MoveRight,
  userRoundCog: UserRoundCog,
  boxes: Boxes,
  shoppingBasket: ShoppingBasket,
  minus: Minus,
  view: ViewIcon,
} as const;

export type IconName = keyof typeof iconRegistry;

interface Props {
  name: IconName;
  className?: string;
  size?: number;
  color?: string;
}

const Icon: FC<Props> = ({ name, className = '', size = 20, color }) => {
  const IconComponent = iconRegistry[name];

  if (!IconComponent) return null;

  return (
    <div className={className}>
      {createElement(IconComponent as React.ComponentType<LucideProps>, {
        ...(color ? { color } : {}),
        size,
      })}
    </div>
  );
};

export { Icon };
