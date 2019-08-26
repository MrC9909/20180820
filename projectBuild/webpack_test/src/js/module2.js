export default function sum(...arg) {
    return arg.reduce((pre,nex)=>(pre+nex),0);
}