type CreatePageInputs = {
    title: string
    description: string
    isLive: boolean
    headerImage:FileList
}

type EditPageInputs = {
    title: string
    description: string
    isLive:boolean
    headerImage:FileList
}

export type { CreatePageInputs, EditPageInputs };
