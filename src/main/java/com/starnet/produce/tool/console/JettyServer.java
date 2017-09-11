/**
 * $Revision$
 * $Date$
 *
 * Modified history:
 *   wubingsheng  2017年9月8日 下午5:41:55  created
 */
package com.starnet.produce.tool.console;

import java.io.File;
import java.util.List;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.nio.SelectChannelConnector;
import org.eclipse.jetty.util.thread.QueuedThreadPool;
import org.eclipse.jetty.webapp.WebAppContext;

import com.starnet.produce.tool.service.DeliveryDataManager;
import com.starnet.produce.tool.service.DeliveryDataManagerImpl;
import com.starnet.produce.tool.service.model.DeliveryData;

/**
 * Jetty Server
 *
 * @author wubingsheng
 */
public class JettyServer {
    //端口号
    public static final int PORT = 8085;
    // web访问的根路径http://ip:port/，相当于项目名,/即忽略项目名
    public static final String CONTEXT = "/";
    //默认 webapp 路径
    private static final String DEFAULT_WEBAPP_PATH = "webapp";
    
    public static List<DeliveryData> deliveryDatas;
    
    public static Server createServerIn(int port) {  
        // 创建Server  
        Server server = new Server();  
        // 添加ThreadPool  
        QueuedThreadPool queuedThreadPool = new QueuedThreadPool();  
        queuedThreadPool.setName("queuedTreadPool");  
        queuedThreadPool.setMinThreads(10);  
        queuedThreadPool.setMaxThreads(200);  
        server.setThreadPool(queuedThreadPool);  
        // 添加Connector  
        SelectChannelConnector connector = new SelectChannelConnector();  
        connector.setPort(port);  
        connector.setAcceptors(4);// 同时监听read事件的线程数  
        connector.setMaxBuffers(2048);  
        connector.setMaxIdleTime(10000);  
        server.addConnector(connector);  
  
        WebAppContext webContext = new WebAppContext(DEFAULT_WEBAPP_PATH, CONTEXT);  
        webContext.setDescriptor("src/main/webapp/WEB-INF/web.xml");  
        webContext.setResourceBase(DEFAULT_WEBAPP_PATH);  
        webContext.setClassLoader(Thread.currentThread().getContextClassLoader());  
        server.setHandler(webContext);  
  
        return server;  
    }  
    
    /**
     * @param args
     */
    public static void main(String[] args) {
        Server server = createServerIn(PORT);
        DeliveryDataManager deliveryDataManager = new DeliveryDataManagerImpl();
        try {
            server.stop();
//            deliveryDatas = deliveryDataManager.readXls(File.separator + "GuangxiShippingDataSheet.xlsx");
            deliveryDatas = deliveryDataManager.readCsv(File.separator + "GuangxiShippingDataSheet.csv");
            server.start();
            server.join();
        } catch (Exception e) {
            e.printStackTrace();
        }  
    }

}
