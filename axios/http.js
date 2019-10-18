const http=((options)=>{
	return new Promise(resolve,reject)=>{
		uni.showLoading({
			title:'加载中...',
			mask:true
		})
		uni.request({
			method:options.method,
			url:options.url,
			data:options.data,
			header:{
				'x-token':''
			},
			success:(res)=>{
				resolve(res.data)
			},
			fail:(err)=>{
				reject(err.data)
				let code=err.data.code;
				switch(code){
					case 100:
					break;
					case 200:
					break;
				}
			},
			complete:()=>{
				uni.hideLoading();
			}
		})
	})
}

export default http