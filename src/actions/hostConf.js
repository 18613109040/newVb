export const staticHost = "";
let __host ={

}
switch (process.env.NODE_ENV) {
  case "development":  //测试环境
    __host = Object.assign({}, __host, {
     	test_host: `${staticHost}/api/`,
    });
    break;
  case "production":
  	__host = Object.assign({}, __host, {
     	test_host: `${staticHost}/api/`,
    });
    break;

  default:
    __host = Object.assign({}, __host, {
        test_host: `${staticHost}/api/`,
    })

}

export const host = __host;
