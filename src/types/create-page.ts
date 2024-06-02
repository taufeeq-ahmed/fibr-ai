type CreatePageInputs = {
    title: string
    description: string
    isLive: boolean
    headerImage:FileList
    buyLink:string
}

type EditPageInputs = {
    title: string
    description: string
    isLive:boolean
    headerImage:FileList
    buyLink:string
}

export type { CreatePageInputs, EditPageInputs };
