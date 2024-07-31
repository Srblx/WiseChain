export interface SubMenuItemType {
  label: string;
  href: string;
}

export interface MenuItemType {
  label: string;
  href: string;
  subItems?: SubMenuItemType[];
}