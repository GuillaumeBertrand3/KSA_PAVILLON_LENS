global.delaySeconds = function(func, wait, args){
	if(!wait){
		wait = 0;
	}
	const keepAlive = {
		exec: function(){
			_args = args;
			func.apply(null, _args);
		}
	}
	if(wait === 0){
		keepAlive.exec();
		return null;
	}else{
		var waitEvent = script.createEvent("DelayedCallbackEvent");
		waitEvent.bind(keepAlive.exec.bind(keepAlive));
		waitEvent.reset(wait);
		return waitEvent;
	}
}