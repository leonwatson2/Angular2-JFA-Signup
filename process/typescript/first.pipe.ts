import {Pipe} from 'angular2/core';


@Pipe({
	name:'firstword'
})


export class JFAFirstWordPipe{
	transform(pipeData, [pipeModifier]){
		return pipeData.split(" ")[0];
	}
}