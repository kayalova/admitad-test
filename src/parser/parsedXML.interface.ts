// low: Лучше называть такие вещи интерфейсами
export type parsedXMLInterface = {
    $: { ID: string }
    NumCode: Array<number>
    CharCode: Array<string>
    Nominal: Array<number>
    Name: Array<string>
    Value: Array<string>
}
