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
 *   wubingsheng  2017年9月7日 下午3:04:34  created
 */
package com.starnet.produce.tool.service;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.eclipse.jetty.server.Connector;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.ContextHandlerCollection;
import org.eclipse.jetty.server.handler.DefaultHandler;
import org.eclipse.jetty.server.handler.HandlerCollection;
import org.eclipse.jetty.server.nio.SelectChannelConnector;
import org.eclipse.jetty.webapp.WebAppContext;

import com.starnet.produce.tool.service.model.DeliveryData;

/**
 * 发货数据相关的 Service 方法实现
 *
 * @author wubingsheng
 */
public class DeliveryDataManagerImpl implements DeliveryDataManager {

    public List<DeliveryData> readXls(String filePath) {
        List<DeliveryData> deliveryDatas = null;
        InputStream inputStream = null;
        XSSFWorkbook xssfWorkbook = null;
        try {
            inputStream = new DeliveryDataManagerImpl().getClass().getResourceAsStream(filePath);
            xssfWorkbook = new XSSFWorkbook(inputStream);
            DeliveryData deliveryData = null;
            deliveryDatas = new ArrayList<DeliveryData>();
            // 循环工作表Sheet
            for (int i = 0; i < xssfWorkbook.getNumberOfSheets(); i++) {
                XSSFSheet xssfSheet = xssfWorkbook.getSheetAt(i);
                if (xssfSheet == null) {
                    continue;
                }
                // 循环行Row
                for (int rowNum = 1; rowNum <= xssfSheet.getLastRowNum(); rowNum++) {
                    XSSFRow xssfRow = xssfSheet.getRow(rowNum);
                    if (xssfRow != null) {
                        deliveryData = new DeliveryData();
                        //根据需求先获取这三个，后面有需求可以再增加
                        XSSFCell imei = xssfRow.getCell(1);
                        XSSFCell mac = xssfRow.getCell(2);
                        XSSFCell sn = xssfRow.getCell(3);
                        
                        deliveryData.setImei(getCellValue(imei));
                        deliveryData.setMac(getCellValue(mac));
                        deliveryData.setSn(getCellValue(sn));
                        
                        deliveryDatas.add(deliveryData);
                    }
                }
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        finally {
            try {
//                xssfWorkbook.close();
                inputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        
        return deliveryDatas;
    }

    public List<DeliveryData> readCsv(String filePath) {
        List<DeliveryData> deliveryDatas = new ArrayList<DeliveryData>();
        InputStream inputStream = null;
        InputStreamReader inputStreamReader = null;
        BufferedReader bufferedReader = null;
        try {
            inputStream = new DeliveryDataManagerImpl().getClass().getResourceAsStream(filePath);
            inputStreamReader = new InputStreamReader(inputStream, "gbk");
            bufferedReader = new BufferedReader(inputStreamReader);
            String line = "";
            //忽略第一行标题
            for (int i = 0; i < 1; i++) {
                line = bufferedReader.readLine();
            }
            while ((line = bufferedReader.readLine()) != null) {
                if (line.trim() != "") {
                    String[] rowData = line.split(",");
                    DeliveryData deliveryData = new DeliveryData();
                    deliveryData.setImei(rowData[1]);
                    deliveryData.setMac(rowData[2]);
                    deliveryData.setSn(rowData[3]);
                    deliveryDatas.add(deliveryData);
                }
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        return deliveryDatas;
    }
    
    public String findImei(HashMap<String, String> cMap, List<DeliveryData> deliveryDatas) {
        String condition = null;
        String imei = null;
        Iterator<DeliveryData> iterator = deliveryDatas.iterator();
        if (cMap.containsKey("mac")) {
            condition = cMap.get("mac");
            while (iterator.hasNext()) {
                DeliveryData deliveryData = iterator.next();
                if (deliveryData.getMac().equals(condition)) {
                    imei = deliveryData.getImei();
                    break;
                }
            }
        } else {
            condition = cMap.get("sn");
            while (iterator.hasNext()) {
                DeliveryData deliveryData = iterator.next();
                if (deliveryData.getSn().equals(condition)) {
                    imei = deliveryData.getImei();
                    break;
                }
            }
        }
        
        return imei;
    }
    
    /**
     * 获取单元格中的值
     * @param xssfCell
     * @return
     */
    private String getCellValue(XSSFCell xssfCell) {
        if (xssfCell.getCellType() == HSSFCell.CELL_TYPE_BOOLEAN) {
             // 返回布尔类型的值
             return String.valueOf(xssfCell.getBooleanCellValue());
         } else if (xssfCell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
             // 返回数值类型的值
             return String.valueOf(xssfCell.getNumericCellValue());
         } else {
             // 返回字符串类型的值
             return String.valueOf(xssfCell.getStringCellValue());
         }
    }
    
    
}
