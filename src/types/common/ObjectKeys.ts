export type ObjectKeys<Obj extends object, Value = any> =
    {
        [key in keyof Obj]?: Value;
    }
