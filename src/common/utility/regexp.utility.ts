import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class RegexpUtility {
    public getRegExpFromQuery(text: string): string {
        if (text === undefined) {
            return '';
        }

        const ar: string[] = text.trim().split(' ');
        let result: string = '(';
        const last = ar.pop();
        for (const elem of ar) {
            if (elem.length > 2) {
                result += this.escapeChar(elem) + ')|(';
            }
        }
        result += this.escapeChar(last) + ')';
        return result;
    }

    private escapeChar(str: string): string {
        str = str.replace(/\[/g, '\\[');
        str = str.replace(/\\/g, '\\');
        str = str.replace(/\^/g, '\\^');
        str = str.replace(/\$/g, '\\$');
        str = str.replace(/\./g, '\\.');
        str = str.replace(/\|/g, '\\|');
        str = str.replace(/\?/g, '\\?');
        str = str.replace(/\*/g, '\\*');
        str = str.replace(/\+/g, '\\+');
        str = str.replace(/\(/g, '\\(');
        str = str.replace(/\)/g, '\\)');
        return str;
    }
}

