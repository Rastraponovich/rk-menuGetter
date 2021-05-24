export const getTreeListByIdent = (ident?: number): string => {
    return `
    <?xml version="1.0" encoding="windows-1251"?>
    <RK7Query>
                <RK7Command2 CMD="GetRefData" RefName="CATEGLIST"  RefItemIdent="${ident}" WithMacroProp="1" IgnoreDefaults="1" WithChildItems="3" >
                   
                </RK7Command2>
            </RK7Query>`
}

export const getTreeList = (): string => {
    return `
    <?xml version="1.0" encoding="windows-1251"?>
    <RK7Query>
                <RK7Command2 CMD="GetRefData" RefName="CATEGLIST"  WithMacroProp="1" IgnoreDefaults="1" WithChildItems="3" >
                   
                </RK7Command2>
            </RK7Query>`
}
