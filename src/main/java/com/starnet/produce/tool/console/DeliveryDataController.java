/**
 * $Revision$
 * $Date$
 *
 * Modified history:
 *   wubingsheng  2017年9月9日 上午9:33:51  created
 */
package com.starnet.produce.tool.console;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.starnet.produce.tool.service.DeliveryDataManager;
import com.starnet.produce.tool.service.DeliveryDataManagerImpl;
import com.starnet.produce.tool.service.model.DeliveryData;

/**
 * 发货数据相关的 Controller 方法
 *
 * @author wubingsheng
 */
@Controller
@RequestMapping("/self/produce/tool")
public class DeliveryDataController {
    
    private static List<DeliveryData> deliveryDatas;
    
    @ResponseBody
    @RequestMapping("/search")
    public Ret query(HttpServletRequest request) {
        Ret ret = new Ret();
        String imei = null;
        String key = request.getParameter("key");
        String value = request.getParameter("value");
        
        DeliveryDataManager deliveryDataManager = new DeliveryDataManagerImpl();
        HashMap<String, String> serachMap = new HashMap<String, String>();
        serachMap.put(key, value);
        if (deliveryDatas == null || deliveryDatas.isEmpty()) {
            deliveryDatas = JettyServer.deliveryDatas;
        }
        imei = deliveryDataManager.findImei(serachMap, deliveryDatas);
        if (imei == null) {
            ret.setCode(-1);
        } else {
            ret.setCode(0);
            ret.setContent(imei);
        }
        
        return ret;
    }
}
