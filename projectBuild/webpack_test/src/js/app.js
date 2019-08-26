/*webpack默认能解析js和json文件，其它文件需要依赖loader进行解析*/

import {add,ride} from './module1';
import sum from './module2';
import json from '../json/data';
import '../less/test1.less';
import '../less/test2.less';

console.log(add(1, 2));
console.log(ride(2, 3));
console.log(sum(1, 2, 3, 4, 5, 6));
console.log(json);