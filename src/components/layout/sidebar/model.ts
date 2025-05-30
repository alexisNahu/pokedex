export interface SingleItem {
    text: string
    icon?: string
}

export interface DropdownItem {
    text: string
    icon?: string
    items: Array<DropdownItem | SingleItem>
}

export type SidebarItemsType = Array<SingleItem | DropdownItem>