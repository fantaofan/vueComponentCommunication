// 首页接口
import Ajax from "../util/request";
// 轮播图接口
export const getSliders = () =>
  Ajax.request({
    url: "/slider"
  });

export default {};
