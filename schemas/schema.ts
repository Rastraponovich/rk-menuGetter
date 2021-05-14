export const GetSystemInfo = () => {
    const result = `<?xml version="1.0" encoding="windows-1251"?>
                    <RK7Query>
                        <RK7Command2 CMD="GetSystemInfo"/>
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
            <RK7Command2 CMD="GetRefData" RefName="MENUITEMS"/>
        </RK7Query>`
    }
}

export const GetCategList = (rest?: string) => {
    if (rest) {
        return `<?xml version="1.0" encoding="windows-1251"?>
        <RK7Query>
            <RK7Command2 CMD="GetRefData" RefName="CATEGLIST">
                <PROPFILTERS>
                    <PROPFILTER Name="MainParentIdent" Value=${rest}/>    
                </PROPFILTERS>
            </RK7Command2>
        </RK7Query>`
    } else {
        return `<?xml version="1.0" encoding="windows-1251"?>
        <RK7Query>
            <RK7Command2 CMD="GetRefData" RefName="CATEGLIST"/>
        </RK7Query>`
    }
}
