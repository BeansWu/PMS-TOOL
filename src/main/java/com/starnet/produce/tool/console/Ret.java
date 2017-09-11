/**
 * $Revision$
 * $Date$
 *
 * Copyright (C) 2008-2014 star-net.cn. All rights reserved.
 * 
 * Modified history:
 *   xuzhh  2014-5-15 下午06:13:48  created
 */
package com.starnet.produce.tool.console;


/**
 * Controller层统一返回的对象.
 * 
 * @author xuzhh
 */
public class Ret {

    /** Error Code， return 0 if success. */
    private int code;

    /** Error message. */
    private String message;

    /**
     * The content returned to web client. (could be any type of java object)
     */
    private Object content;

    /**
     * default construct.
     */
    public Ret() {
        this.code = 0;
        this.message = "success";
    }

    /**
     * construct.
     * 
     * @param content the content
     */
    public Ret(Object content) {
        this.code = 0;
        this.message = "success";
        this.content = content;
    }

    /**
     * construct.
     * 
     * @param code the code
     * @param message the message
     */
    public Ret(int code, String message) {
        this.code = code;
        this.message = message;
    }

    /**
     * construct.
     * 
     * @param code the code
     * @param message the message
     * @param content the content
     */
    public Ret(int code, String message, Object content) {
        this.code = code;
        this.message = message;
        this.content = content;
    }

    /**
     * Gets the code(.
     * 
     * @return the code
     */
    public int getCode() {
        return code;
    }

    /**
     * Sets the code.
     * 
     * @param code the code to set
     */
    public void setCode(int code) {
        this.code = code;
    }

    /**
     * Gets the message(.
     * 
     * @return the message
     */
    public String getMessage() {
        return message;
    }

    /**
     * Sets the message.
     * 
     * @param message the message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * Gets the content(.
     * 
     * @return the content
     */
    public Object getContent() {
        return content;
    }

    /**
     * Sets the content.
     * 
     * @param content the content to set
     */
    public void setContent(Object content) {
        this.content = content;
    }

}
