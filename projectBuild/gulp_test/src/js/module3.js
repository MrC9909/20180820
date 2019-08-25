export function sum(...arg) {
    arg.reduce((pre,nex)=>{
        return pre + nex;
    });
}