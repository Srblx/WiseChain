export interface MenuItemType {
  label: string;
  href: string;
}

export interface MenuProps {
  menuItems: { label: string; href: string }[];
}
