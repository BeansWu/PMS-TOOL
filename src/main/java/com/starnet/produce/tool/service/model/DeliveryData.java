/**
 * $Revision$
 * $Date$
 *
 * Copyright (C) 2008-2014 star-net.cn. All rights reserved.
 * <p>
 * This software is the confidential and proprietary information of StarNetUC.
 * You shall not disclose such Confidential Information and shall use it only
 * in accordance with the terms of the agreements you entered into with StarNetUC.
 * 
 * Modified history:
 *   wubingsheng  2017年9月7日 下午2:49:12  created
 */
package com.starnet.produce.tool.service.model;

/**
 * 发货数据
 *
 * @author wubingsheng
 */
public class DeliveryData {
    /** IMEI */
    private String imei;
    /** MAC */
    private String mac;
    /** SN */
    private String sn;
    public String getImei() {
        return imei;
    }
    public void setImei(String imei) {
        this.imei = imei;
    }
    public String getMac() {
        return mac;
    }
    public void setMac(String mac) {
        this.mac = mac;
    }
    public String getSn() {
        return sn;
    }
    public void setSn(String sn) {
        this.sn = sn;
    }
    @Override
    public String toString() {
        return "DeliveryData [imei=" + imei + ", mac=" + mac + ", sn=" + sn + "]";
    }
}
