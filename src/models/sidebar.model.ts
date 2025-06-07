export interface SingleItem {
    text: string
    icon?: string
    url?: string
}

export interface DropdownItem {
    text: string
    icon: string
    bootstrapIcon: string,
    items: Array<DropdownItem | SingleItem>
}

export type SidebarItemsType = Array<SingleItem | DropdownItem>