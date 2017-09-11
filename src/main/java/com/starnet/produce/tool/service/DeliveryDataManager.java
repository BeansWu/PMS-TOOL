/**
 * $Revision$
 * $Date$
 *
 * Modified history:
 *   wubingsheng  2017年9月9日 上午10:15:52  created
 */
package com.starnet.produce.tool.service;

import java.util.HashMap;
import java.util.List;

import com.starnet.produce.tool.service.model.DeliveryData;

/**
 * 发货数据相关的 Service 方法接口
 *
 * @author wubingsheng
 */
public interface DeliveryDataManager {
    /**
     * 读取 xls 文件中的数据
     * @param filePath  文件路径
     * @return
     */
    List<DeliveryData> readXls(String filePath);
    
    /**
     * 读取 csv 文件中的数据
     * @param filePath
     * @return
     */
    List<DeliveryData> readCsv(String filePath);
    
    /**
     * 查询
     * @param cMap 条件
     * @param deliveryDatas 发货数据
     * @return
     */
    String findImei(HashMap<String, String> cMap, List<DeliveryData> deliveryDatas);
}
