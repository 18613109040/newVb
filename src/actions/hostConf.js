export const staticHost = "";
export const activityHost = "";
let __host ={

}
switch (process.env.NODE_ENV) {
  case "development":  //测试环境
    __host = Object.assign({}, __host, {
     	test_host: `${staticHost}/`,
      activity_host: `${activityHost}/hd/`,
    });
    break;
  case "production":
  	__host = Object.assign({}, __host, {
     	test_host: `${staticHost}/`,
      activity_host: `${activityHost}/hd/`,
    });
    break;

  default:
    __host = Object.assign({}, __host, {
        test_host: `${staticHost}/`,
        activity_host: `${activityHost}/hd/`,
    })

}

export const host = __host;
