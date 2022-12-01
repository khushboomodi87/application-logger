import { LoggerListData } from "./types";

export const sortArray = (arr: any[], key: string, method: 'asc' | 'desc', dataType?: string): any[] => {
    if (method === 'asc') {
        if (dataType == "date") {
            return arr.sort((a: any, b: any) => (new Date(a[key]) > new Date(b[key]) ? 1 : -1));
        } else if(dataType == "toCheckNull") {
            return arr.sort((a: any, b: any) => (a[key] !== null ||  a[key] > b[key] ? 1 : -1));
        } else {
            return arr.sort((a: any, b: any) => (a[key] > b[key] ? 1 : -1));
        }
    } else {
        if (dataType === "date") {
            return arr.sort((a: any, b: any) => (new Date(a[key]) < new Date(b[key]) ? 1 : -1));
        } else {
            return arr.sort((a: any, b: any) => (a[key] < b[key] ? 1 : -1));
        }
    }
}


export const getUniqueValueList = (data: LoggerListData[], key: string): string[] => {
    const uniqueSet = new Set(data.map(item => item[key as keyof LoggerListData]));
    const uniqueArray = Array.from(uniqueSet.values()).filter((element): element is string => {
        return element !== null;
    });
    return uniqueArray;
}