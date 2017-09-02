import { Component, Inject, OnInit, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "sort"
})

export class SequencePipe implements PipeTransform {
    transform(array: Array<any>): Array<string> {
        array.sort((a: any, b: any) => {
            if (a.sequence < b.sequence) {
                return -1;
            } else if (a.sequence > b.sequence) {
                return 1;
            } else {
                return 0;
            }
        });
    
    return array;
    }
}
