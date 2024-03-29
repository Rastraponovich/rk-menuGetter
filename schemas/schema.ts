export const GetSystemInfo = () => {
    const result = `<?xml version="1.0" encoding="windows-1251"?>
                    <RK7Query>
                        <RK7Command2 CMD="GetSystemInfo"/>
                    </RK7Query>`
    return result
}
interface IFilter {
    [key: string]: string | string[]
}

interface IGetRefDataProps {
    name: string | string[]
    filter?: IFilter
    params?: IFilter
}

export const GetRefData = (props: IGetRefDataProps): string => {
    const { name, filter, params } = props
    const filters = []
    const options = []

    if (filter) {
        for (let [key, value] of Object.entries(filter)) {
            filters.push(`<PROPFILTER Name="${key}" Value="${value}"/>`)
        }
    }

    if (params) {
        for (let [key, value] of Object.entries(params)) {
            options.push(`${key}="${value}" `)
        }

        return `<?xml version="1.0" encoding="windows-1251"?>
            <RK7Query>
                <RK7Command2 CMD="GetRefData" RefName="${name}" ${options.join(
            ""
        )}>
                <PROPFILTERS>${filters.join("")}</PROPFILTERS>
                </RK7Command2>
            </RK7Query>`
    } else {
        return `<?xml version="1.0" encoding="windows-1251"?>
        <RK7Query>
            <RK7Command2 CMD="GetRefData" RefName="${name}" ${options.join(
            ""
        )}/>
                
        </RK7Query>`
    }
}

export const GetRefList = () => {
    const result = `<?xml version="1.0" encoding="windows-1251"?>
                    <RK7Query>
                        <RK7Command2 CMD="GetRefList"/>
                    </RK7Query>`
    return result
}

export const GetMenuItems = (mainParentIdent?: string) => {
    if (mainParentIdent) {
        return `<?xml version="1.0" encoding="windows-1251"?>
        <RK7Query>
            <RK7Command2 CMD="GetRefData" RefName="MENUITEMS">
                <PROPFILTERS>
                    <PROPFILTER Name="MainParentIdent" Value=${mainParentIdent}   />    
                </PROPFILTERS>
            </RK7Command2>
        </RK7Query>`
    } else {
        return `<?xml version="1.0" encoding="windows-1251"?>
        <RK7Query>
        <RK7Command2 CMD="GetRefData" RefName="MENUITEMS" WithChildItems="1">
        <PROPFILTERS>
            <PROPFILTER Name="HighLevelGroup1" Value="${1000051}" />    
        </PROPFILTERS>
    </RK7Command2>
        </RK7Query>`
    }
}

export const getMenuTreeByIdent = (ident: number) => {
    return `<?xml version="1.0" encoding="windows-1251"?>
    <RK7Query>
        <RK7Command2 CMD="GetRefData" RefName="CATEGLIST" WithMacroProp="1" WithChildItems="3" PropMask="RIChildItems.*" RefItemIdent="${ident}">
            
        </RK7Command2>
    </RK7Query>`
}

//OnlyActive="1"
// PropMask="items.(), RIChildItems.(CategPath,Parent,Status,Name,Ident,PRICETYPES-3)
export const GetCategList = (rest?: string, ident?: number) => {
    if (rest.length > 0) {
        return `<?xml version="1.0" encoding="windows-1251"?>
        <RK7Query>
            <RK7Command2 CMD="GetRefData" RefName="CATEGLIST" WithMacroProp="1"  WithChildItems="3">
                <PROPFILTERS>
                    <PROPFILTER Name="ItemIdent" Value="${ident}"/>    
                </PROPFILTERS>
            </RK7Command2>
        </RK7Query>`
    } else {
        return `<?xml version="1.0" encoding="windows-1251"?>
        <RK7Query>
            <RK7Command2 CMD="GetRefData" RefName="CATEGLIST"  WithMacroProp="1"  WithChildItems="3" PropMask="items.(Code,Name,PriceType-3, Ident,CategPath,Status)">
               
            </RK7Command2>

        </RK7Query>`
    }
}
